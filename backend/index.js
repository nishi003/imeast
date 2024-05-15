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

app.use(express.json());
app.use(cors());

//Database Connection with MongoDB #eugene needs to redo with his own account.
mongoose.connect("mongodb+srv://basnetsan25:InnWSc0E6O7SG3m6@cluster0.4vviipo.mongodb.net/");

//API Creation
app.get("/", (req, res) => {
    res.send("Express App is Running")
})

//Image Storage Engine
const storage = multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

//Creating Upload Endpoint for images
app.use("/images", express.static('upload/images'))
app.post("/upload", upload.single("product"), (req, res) =>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
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
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price:{
        type: Number,
        required:true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    video_embed_link: {
        type: String,
        required: true,
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
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed:"+req.body.id);
    res.json({
        success: true,
        name: req.body.name
    })
})

//creating API for getting all prodcuts
app.get('/allproducts', async(req, res)=>{
    let products = await Product.find({})
    console.log("All Products Fetched.")
    res.send(products)
})

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
    DBmonth: {
        type: String,
    },
    DBday: {
        type: String, 
    },
    DByear: {
        type: String,
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
    if (typeof req.body.DBmonth == 'undefined'){
        missingFields.push("DBmonth")
    }
    if (typeof req.body.DBday == 'undefined'){
        missingFields.push("DBday")
    }
    if (typeof req.body.DByear == 'undefined'){
        missingFields.push("DByear")
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

    let cart = {};
    // NOTE: I don't like the static cart data init. make it dynamic with all products probably.
    for (let i = 0; i<300; i++){
        cart[i] = 0;
    }

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
        DBmonth: req.body.DBmonth,
        DBday: req.body.DBday,
        DByear: req.body.DByear,
        modulesBought: cart,
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

    const token = jwt.sign(data, 'imEast_tokenEncryptionKey')
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
