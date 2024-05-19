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
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

//PDF Storage Engine
const PDFstorage = multer.diskStorage({
    destination:'./upload/pdf',
    filename:(req,file,cb) =>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})


const upload = multer({storage:Imagestorage})
const pdfupload = multer({storage:PDFstorage})

//Creating Upload Endpoint for images
app.use("/images", express.static('upload/images'))
app.post("/upload", upload.single("product"), (req, res) =>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

//Upload Endpoint for PDFs
app.use("/pdf", express.static("upload/pdf"))
app.post("/pdfupload", pdfupload.single("productlesson"), (req, res) =>{
    res.json({
        success: 1,
        pdf_url: `http://localhost:${port}/pdf/${req.file.filename}`
    })
})

//Schema for Creating Products
const Product = mongoose.model("Product", {
    id:{
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    //thumbnail
    image: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: true,
    },
    new_price:{
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: false,
    },
    video_embed_link: {
        type: String,
        //for now false
        required: false,
    },
    date:{
        type: Date,
        default: Date.now,
    },

})

app.post('/addproduct', async (req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0)
    {
        let last_product_array = products.slice(-1)
        let last_product = last_product_array[0]
        id = last_product.id+1
    }
    else{
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
app.post('/removeproduct', async(req, res)=>{
    const id = await Product.find({id: req.body.id});
    if (id.length !== 0){
        await Product.findOneAndDelete({id:req.body.id});
        console.log("Removed:"+req.body.id);
        res.json({
            success: true,
            error: "",
            name: req.body.name,

        })
    }
    else{
        res.json({
            success: false,
            error: "No id found"
        })
    }
})

//add to cart endpoint
//req format: {usertoken: "", product id: str}
//stripe requires so we'll filter through products to get that.[{id: ,name: , priceCents: },...]
app.post('/addtocart', async(req, res)=>{
    let usertoken = req.body.usertoken
    let userid = JSON.parse(atob(usertoken.split('.')[1]));
    const filter = {_id: userid.user.id};

    //getting values from Products
    const productID = req.body.productID;
    const productDoc = await Product.findOne({id: req.body.productID});
    const itemFormatted = {id: productID, name: productDoc.name, priceCents: productDoc.new_price * 100};
    let userdoc = await Users.findById(filter);
    let temp_cart = Array.from(userdoc.cart);

    //get the product ids
    //console.log(temp_cart)
    const idList = [];
    for (const items of Object.entries(temp_cart)){
        let item = items[1]["id"]
        //console.log(item)
        idList.push(item)
    }
    //console.log(idList)

    if (!idList.includes(productID)) {
        temp_cart.push(itemFormatted);

        userdoc.cart = temp_cart;
        await userdoc.save();
        res.json({success: true})
    }
    else{
        res.json({success: false, message: "item already exists"})
    }

})

//remove from cart endpoint
//req format: {usertoken: "", product id: ""}
app.post('/removefromcart', async(req, res)=>{
    let usertoken = req.body.usertoken
    let userid = JSON.parse(atob(usertoken.split('.')[1]));
    const filter = {_id: userid.user.id};

    //getting values from Products
    const productID = req.body.productID;
    const productDoc = await Product.findOne({id: req.body.productID});
    const itemFormatted = {id: productID, name: productDoc.name, priceCents: productDoc.new_price * 100};
    let userdoc = await Users.findById(filter);
    let temp_cart = Array.from(userdoc.cart);

    //get the product ids
    //console.log(temp_cart)
    const idList = [];
    for (const items of Object.entries(temp_cart)){
        let item = items[1]["id"]
        //console.log(item)
        idList.push(item)
    }
    //console.log(idList)
    

    if (!idList.includes(productID)) {
        res.json({success: false, message: "item doesn't exist in cart"})
    }
    else{
        const indexproduct = temp_cart.indexOf(itemFormatted)
        temp_cart.splice(indexproduct, 1);

        userdoc.cart = temp_cart;
        await userdoc.save();
        res.json({sucess: true})
    }

})

//update modules bought after payment
//json req: only the user token 
app.post('/paymentsuccess', async(req, res)=>{
    let usertoken = req.body.usertoken
    let userid = JSON.parse(atob(usertoken.split('.')[1]));
    const filter = {_id: userid.user.id};
    let userdoc = await Users.findById(filter);

    //update modules bought
    userdoc.modulesBought = Array.from(userdoc.cart);
    await userdoc.save()

    //clear the cart
    userdoc.cart = [];
    await userdoc.save()
})



//creating API for getting all prodcuts
app.get('/allproducts', async(req, res)=>{
    let products = await Product.find({})
    console.log("All Products Fetched.")
    res.send(products)
})

//stripe payment
app.use('/stripepayment', stripeRouter);


//comments
app.use('/comments', Comments);

function isvalidyear(str) {
    const date = new Date();
    let curYear = date.getFullYear(); //getting current year
    var n = Math.floor(Number(str));
    return n !== Infinity && String(n) === str && n >= 0 && n < curYear;
}

//Sign in Google
app.use('/oauth', authRouter);
app.use('/request', requestRouter);

app.post('/request', (req, res)=>{
    const data = res.json();
    return data
})

//Schema for User model
const Users = mongoose.model('Users', {
    name: {
        type: String,
    },
    email:{
        type: String,
        unique: true,
    },
    sex: {
        type: String,
    },
    birthDate: {
        type: Date,
    },
    pw1: {
        type: String,
    }, 
    pw2: {
        type: String,
    },
    password:{
        type: String,
    },
    cart:{
        type: Object
    },
    modulesBought:{
        type: Object
    },
    date: {
        type: Date,
        default: Date.now,
    },
    admin: {
        type: Boolean,
        default: false
    },
    registeredCollege: {
        type: String,
        required: false
    },
    lisenceNumber: {
        type: Number,
        required: false
    },
    practiceLocation: {
        type: String,
        required: false
    },
    professionType: {
        type: String,
        required: false
    },
    practicePeriod: {
        type: Number,
        required: false
    }
})

//Creating the endpoint for registering the user
app.post('/signup', async(req, res)=>{
    let check = await Users.findOne({email: req.body.email}) //finds if there is already an existing email address.
    if (check){
        return res.status(400).json({success: false, errors: "existing user found with the same email address."})
    }

    //Required fields (non-admin) validator. essential missing fields
    let missingFields = []
    if (typeof req.body.email == 'undefined'){
        missingFields.push("email")
    }
    if (typeof req.body.pw1 == 'undefined'){
        missingFields.push("pw1")
    }
    if (typeof req.body.pw2 == 'undefined'){
        missingFields.push("pw2")
    }
    if (typeof req.body.sex == 'undefined'){
        missingFields.push("sex")
    }
    if (typeof req.body.birthDate == 'undefined'){
        missingFields.push("birthDate")
    }

    //password validator
    if (!(req.body.pw1 == req.body.pw2)) {
        return res.status(400).json({success: false, errors: "password 1 and password 2 don't match", fieldname: missingFields})
    }
    else if (req.body.pw1.length < 8){
        return res.status(400).json({success: false, errors: "password must be at least 8 characters long", fieldname: missingFields})
    }

    //year validator
    if (!isvalidyear){
        return res.status(400).json({success: false, errors: "invalid year", fieldname: missingFields})
    }

    //owned objects are just arrays of product ids.
    let owned = [];

    //cart is the same thing, arrays of product ids.
    let cart = [];

    //admin check for fields.
    let isAdmin = req.body.admin
    if (isAdmin){
        if (typeof req.body.lisenceNumber == 'undefined'){
            missingFields.push("lisenceNumber")
        }
        if (typeof req.body.registeredCollege == 'undefined'){
            missingFields.push("registeredCollege")
        }
        if (typeof req.body.practiceLocation == 'undefined'){
            missingFields.push("practiceLocation")
        }
        if (typeof req.body.professionType == 'undefined'){
            missingFields.push("professionType")
        }
        if (typeof req.body.practicePeriod == 'undefined'){
            missingFields.push("practicePeriod")
        }
    }
    if (missingFields.length !== 0){
        return res.status(400).json({success: false, errors: "missing fields", fieldname: missingFields})
    }
    

    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.pw1,
        sex: req.body.sex,
        birthDate: req.body.birthDate,
        modulesBought: owned,
        cart: cart,
        admin: req.body.admin,
        registeredCollege: req.body.registeredCollege,
        lisenceNumber: req.body.lisenceNumber,
        practiceLocation: req.body.practiceLocation,
        professionType: req.body.professionType,
        practicePeriod: req.body.practicePeriod
    })

    await user.save();

    const data = {
        user: {
            id: user.id
        }
    }

    const token = jwt.sign(data, 'imEast_tokenEncryptionKey') //may also somehow put this into .env
    res.json({success:true, token})

})

app.post('/login', async (req, res) =>{
    let user = await Users.findOne({email: req.body.email});
    if (user){
        const passCompare = req.body.password === user.password;
        if(passCompare) {
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data, 'imEast_tokenEncryptionKey');
            res.json({success: true, token})
        }
        else{
            res.json({success: false, errors: "Wrong Password"})
        }
    }
    else{
        res.json({success: false, errors: "Email does not exist"})
    }
} )

app.listen(port, (error)=>{
    if (!error) {
        console.log("Server Running on Port"+port)
    }
    else
    {
        console.log("Error: "+error)
    }
})
