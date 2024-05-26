const port = 4000;
const express = require("express");
const mongoose = require("mongoose")
const multer = require("multer")
const path = require("path")
const cors = require("cors")
const app = express();

const dotenv = require("dotenv");
dotenv.config();

//routers
var authRouter = require('./routes/oauth');
var stripeRouter = require('./routes/stripe');
var Comments = require('./routes/comments');
var Modules = require('./routes/moduleroute');
var requestRouter = require('./routes/request');
var Users = require('./routes/userroute');
var PurchasesTransactions = require('./routes/purchaseRoute');


app.use(express.json());
app.use(cors());

app.use('/stripepayment', stripeRouter);
app.use('/comments', Comments);
app.use('/modules', Modules);
app.use('/Users', Users)
app.use('/purchase', PurchasesTransactions)



//vimeo sdk setup
let Vimeo = require('vimeo').Vimeo;
let vimeoClient = new Vimeo(process.env.VIMEO_CLIENTID, process.env.VIMEO_CLIENTSECRET, process.env.VIMEO_ACCESS_TOKEN);


//Database Connection with MongoDB #eugene needs to redo with his own account. uncomment the line below and comment out the other database.
//mongoose.connect("mongodb+srv://eugeneyuchanjang:klrUCKGCOwY6w1iL@imeastdb.gi927z1.mongodb.net/");

//my own test database
// mongoose.connect("mongodb+srv://basnetsan25:InnWSc0E6O7SG3m6@cluster0.4vviipo.mongodb.net/");

// nishi database connection
mongoose.connect('mongodb+srv://nishi003:mxwI4Mmyf0OQEptq@test-database.5buokwp.mongodb.net/');

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
    let userdoc = await User.findById(filter);
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
    let userdoc = await User.findById(filter);
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
    let userdoc = await User.findById(filter);

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





//Sign in Google
app.use('/oauth', authRouter);
app.use('/request', requestRouter);

app.post('/request', (req, res) => {
    const data = res.json();
    return data
})



app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on Port" + port)
    }
    else {
        console.log("Error: " + error)
    }
})
