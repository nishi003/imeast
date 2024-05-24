const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const path = require("path")
const cors = require("cors")

//google auth
var authRouter = require('./routes/oauth')
var requestRouter = require('./routes/request')

//stripe
var stripeRouter = require('./routes/stripe')

//comments
var Comments = require('./routes/comments')

app.use(express.json());
app.use(cors());

//Database Connection with MongoDB #eugene needs to redo with his own account. uncomment the line below and comment out the other database.
//mongoose.connect("mongodb+srv://eugeneyuchanjang:klrUCKGCOwY6w1iL@imeastdb.gi927z1.mongodb.net/");

//my own test database
mongoose.connect("mongodb+srv://basnetsan25:InnWSc0E6O7SG3m6@cluster0.4vviipo.mongodb.net/");

//API Creation
app.get("/", (req, res) => {
    res.send("Express App is Running")
})

//Image Storage Engine
const Imagestorage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

//PDF Storage Engine
const PDFstorage = multer.diskStorage({
    destination: './upload/pdf',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})


const upload = multer({ storage: Imagestorage })
const pdfupload = multer({ storage: PDFstorage })

//Creating Upload Endpoint for images
app.use("/images", express.static('upload/images'))
app.post("/upload", upload.single("product"), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

//Upload Endpoint for PDFs
app.use("/pdf", express.static("upload/pdf"))
app.post("/pdfupload", pdfupload.single("productlesson"), (req, res) => {
    res.json({
        success: 1,
        pdf_url: `http://localhost:${port}/pdf/${req.file.filename}`
    })
})

//vimeo stuff
//dot env for vimeo secrets
const dotenv = require("dotenv");
dotenv.config();

let Vimeo = require('vimeo').Vimeo;
let client = new Vimeo(process.env.VIMEO_CLIENTID, process.env.VIMEO_CLIENTSECRET, process.env.VIMEO_ACCESS_TOKEN);

app.post('/uploadvideo', async (req, res) => {

})

const Product = require('./models/Product');

app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1)
        let last_product = last_product_array[0]
        id = last_product.id + 1
    }
    else {
        id = 1
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
        video_embed_link: req.body.video_embed_link
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name
    })
})

// Creating API for deleting products
app.post('/removeproduct', async (req, res) => {
    const id = await Product.find({ id: req.body.id });
    if (id.length !== 0) {
        await Product.findOneAndDelete({ id: req.body.id });
        console.log("Removed:" + req.body.id);
        res.json({
            success: true,
            error: "",
            name: req.body.name,

        })
    }
    else {
        res.json({
            success: false,
            error: "No id found"
        })
    }
})

//add to cart endpoint
//req format: {usertoken: "", product id: str}
//stripe requires so we'll filter through products to get that.[{id: ,name: , priceCents: },...]
app.post('/addtocart', async (req, res) => {
    let usertoken = req.body.usertoken
    let userid = JSON.parse(atob(usertoken.split('.')[1]));
    const filter = { _id: userid.user.id };

    //getting values from Products
    const productID = req.body.productID;
    const productDoc = await Product.findOne({ id: req.body.productID });
    const itemFormatted = { id: productID, name: productDoc.name, priceCents: productDoc.new_price * 100 };
    let userdoc = await Users.findById(filter);
    let temp_cart = Array.from(userdoc.cart);

    //get the product ids
    //console.log(temp_cart)
    const idList = [];
    for (const items of Object.entries(temp_cart)) {
        let item = items[1]["id"]
        //console.log(item)
        idList.push(item)
    }
    //console.log(idList)

    if (!idList.includes(productID)) {
        temp_cart.push(itemFormatted);

        userdoc.cart = temp_cart;
        await userdoc.save();
        res.json({ success: true })
    }
    else {
        res.json({ success: false, message: "item already exists" })
    }

})

//remove from cart endpoint
//req format: {usertoken: "", product id: ""}
app.post('/removefromcart', async (req, res) => {
    let usertoken = req.body.usertoken
    let userid = JSON.parse(atob(usertoken.split('.')[1]));
    const filter = { _id: userid.user.id };

    //getting values from Products
    const productID = req.body.productID;
    const productDoc = await Product.findOne({ id: req.body.productID });
    const itemFormatted = { id: productID, name: productDoc.name, priceCents: productDoc.new_price * 100 };
    let userdoc = await Users.findById(filter);
    let temp_cart = Array.from(userdoc.cart);

    //get the product ids
    //console.log(temp_cart)
    const idList = [];
    for (const items of Object.entries(temp_cart)) {
        let item = items[1]["id"]
        //console.log(item)
        idList.push(item)
    }
    //console.log(idList)


    if (!idList.includes(productID)) {
        res.json({ success: false, message: "item doesn't exist in cart" })
    }
    else {
        const indexproduct = temp_cart.indexOf(itemFormatted)
        temp_cart.splice(indexproduct, 1);

        userdoc.cart = temp_cart;
        await userdoc.save();
        res.json({ sucess: true })
    }

})

//update modules bought after payment
//json req: only the user token 
app.post('/paymentsuccess', async (req, res) => {
    let usertoken = req.body.usertoken
    let userid = JSON.parse(atob(usertoken.split('.')[1]));
    const filter = { _id: userid.user.id };
    let userdoc = await Users.findById(filter);

    //update modules bought
    userdoc.modulesBought = Array.from(userdoc.cart);
    await userdoc.save()

    //clear the cart
    userdoc.cart = [];
    await userdoc.save()
})

//creating API for getting all prodcuts
app.get('/allproducts', async (req, res) => {
    let products = await Product.find({})
    console.log("All Products Fetched.")
    res.send(products)
})

//stripe payment
app.use('/stripepayment', stripeRouter);

//comments
app.use('/comments', Comments);

//Sign in Google
app.use('/oauth', authRouter);
app.use('/request', requestRouter);

app.post('/request', (req, res) => {
    const data = res.json();
    return data
})

const Users = require('./models/Users')

app.post('/user/signup/', async (req, res) => {
    let errors = {};
    let isIncomplete = false;

    const fieldNames = {
        'firstName': '',
        'lastName': '',
        'sex': '',
        'birthday': '',
        'email': '',
        'phoneNumber': '',
        'pw1': '',
        'pw2': '',
        'registeredCollege': '',
        'licenseNumber': '',
        'practiceLocation': '',
        'professionType': '',
        'practicePeriod': '',
        'other': '',
    };

    for (const field in fieldNames) {
        if (!req.body[field]) {
            if (field === 'other') {
                if (req.body['professionType'] && req.body['professionType'] === 'other') {
                    errors[field] = 'This field is required.'; // other is only required if the professionType is other
                    isIncomplete = true;
                } else {
                    errors['other'] = ''; // the professionType is not other, other is not required
                }
            } else {
                errors[field] = 'This field is required.';
                isIncomplete = true;
            }
        } else {
            errors[field] = '';
            fieldNames[field] = req.body[field].trim(); // the field is not empty, trim and store
        }
    };

    if (fieldNames['pw1'] !== '' && fieldNames['pw1'] !== '') {
        if (fieldNames['pw1'] !== fieldNames['pw2']) {
            errors["pw2"] = "The passwords you entered do not match.";
            isIncomplete = true;
        }
        if (fieldNames['pw1'].length < 8) {
            errors["pw1"] = "The password must be at least 8 characters long.";
            isIncomplete = true;
        }
    }

    if (fieldNames['birthday']) {
        const today = new Date();
        const birthday = new Date(req.body.birthday);

        let age = today.getFullYear() - birthday.getFullYear();
        const birthMonth = birthday.getMonth();
        const todayMonth = today.getMonth();

        if (todayMonth < birthMonth || (todayMonth === birthMonth && today.getDate() < birthday.getDate())) {
            age--;
        }

        if (age < 18) {
            errors["birthday"] = "You must be at least 18 years old.";
            isIncomplete = true;
        }
    }

    const existingUser = await Users.findOne({ email: fieldNames['email'] });
    if (existingUser) {
        errors['email'] = 'This email is already registered.';
        isIncomplete = true;
    }

    if (isIncomplete) {
        return res.status(400).json({ success: false, errors: errors });
    }

    const user = new Users({
        isAdmin: false,
        firstName: fieldNames['firstName'],
        lastName: fieldNames['lastName'],
        email: fieldNames['email'],
        phoneNumber: fieldNames['phoneNumber'],
        password: fieldNames['pw1'],
        sex: fieldNames['sex'],
        birthday: fieldNames['birthday'],
        registeredCollege: fieldNames['registeredCollege'],
        licenseNumber: fieldNames['licenseNumber'],
        practiceLocation: fieldNames['practiceLocation'],
        professionType: fieldNames['professionType'],
        practicePeriod: fieldNames['practicePeriod'],
        other: fieldNames['other'],
    });

    try {
        await user.save();
        const data = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(data, 'imEast_tokenEncryptionKey'); //may also somehow put this into .env
        return res.status(200).json({ success: true, token: token });
    } catch (error) {
        errors['serverError'] = 'There was an internal server error. Please try again later.';
        return res.status(400).json({ success: false, errors: errors });
    }
})

app.post('/login/', async (req, res) => {
    let errors = {};
    let isIncomplete = false;

    const fieldNames = {
        'email': '',
        'password': '',
    };

    for (const field in fieldNames) {
        if (!req.body[field]) {
            errors[field] = 'This field is required.';
            isIncomplete = true;
        } else {
            errors[field] = '';
            fieldNames[field] = req.body[field].trim();
        }
    };

    if (isIncomplete) {
        return res.status(400).json({ success: false, errors: errors });
    }

    let user = await Users.findOne({ email: req.body.email });
    if (!user) {
        errors['valid'] = 'This email is not registered with imEast.';
        return res.status(400).json({ success: false, errors: errors });
    }

    if (user.password !== fieldNames['password']) {
        errors['valid'] = 'Email and password combination do not match our records.';
        return res.status(400).json({ success: false, errors: errors });
    }

    const data = {
        user: {
            id: user.id
        }
    };

    const token = jwt.sign(data, 'imEast_tokenEncryptionKey');
    const info = {
        access: token,
        userID: user.id,
        isAdmin: user.isAdmin,
    }
    return res.status(200).json({ success: true, info: info });
})

const Modules = require('./models/Modules')

app.post('/module/', async (req, res) => {
    let errors = {};
    let isIncomplete = false;

    const fieldNames = {
        'title': '',
        'duration': '',
        'description': '',
        'pdf': '',
        'image': '',
        'price': '',
        'link': '',
    };

    for (const field in fieldNames) {
        if (!req.body[field]) {
            if (field === 'pdf' || field === 'image' || field === 'link') {
                errors[field] = '';
                fieldNames[field] = req.body[field].trim();
            } else {
                errors[field] = 'This field is required.';
                isIncomplete = true;
            }
        } else {
            errors[field] = '';
            fieldNames[field] = req.body[field].trim();
        }
    };

    if (isIncomplete) {
        return res.status(400).json({ success: false, errors: errors });
    }

    const module = new Modules({
        title: fieldNames['title'],
        duration: fieldNames['duration'],
        description: fieldNames['description'],
        pdf: fieldNames['pdf'],
        image: fieldNames['image'],
        price: fieldNames['price'],
        link: fieldNames['link'],
    });

    try {
        await module.save();
        return res.status(200).json({ success: true, message: 'Module saved successfully.' });
    } catch (error) {
        errors['serverError'] = 'There was an internal server error. Please try again later.';
        return res.status(400).json({ success: false, errors: errors });
    }
})

app.get('/module/', async (req, res) => {
    try {
        let modules;
        if (req.isAdmin) {
            modules = await Modules.find({}, '-pdf -price -link').lean();
        } else {
            modules = await Modules.find({}, '-pdf').lean();
        }
        return res.status(200).json({ success: true, modules: modules });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
})

const Purchases = require('./models/Purchases')

app.get('/module/:moduleID/', async (req, res) => {
    try {
        const userID = req.body.userID
        const moduleID = req.params.moduleID;
        const module = await Modules.findById(moduleID);

        if (!module) {
            return res.status(404).json({ success: false, error: 'Module does not exist.' });
        }

        let return_module = {};
        if (req.isAdmin) {
            return_module['moduleID'] = module.id;
            return_module['title'] = module.title;
            return_module['duration'] = module.duration;
            return_module['description'] = module.description;
            return_module['pdf'] = module.pdf;
            return_module['image'] = module.image;
            return_module['price'] = module.price;
            return_module['link'] = module.link;
        } else {
            const userOwns = await Purchases.findOne({ userID: userID, moduleID: moduleID })
        }

        let fields;
        if (req.user && req.user.isAdmin) {
            // Admin has access to all fields
            fields = ['moduleID', 'title', 'duration', 'description', 'pdf', 'picture', 'price'];
        } else {
            // Non-admin user has limited access
            fields = ['moduleID', 'title', 'duration', 'description', 'pdf', 'picture'];
        }

        // Extract selected fields from the module object
        const responseData = {};
        fields.forEach(field => {
            responseData[field] = module[field];
        });

        // Return the module info as a response
        return res.status(200).json({ success: true, module: responseData });
    } catch (error) {
        // If an error occurs, return an error response
        return res.status(500).json({ success: false, error: error.message });
    }
})

app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on Port" + port)
    }
    else {
        console.log("Error: " + error)
    }
})
