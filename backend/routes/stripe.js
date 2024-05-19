// const datas = require('../index.js');
// const Product = datas.Product;

// console.log(Product)
//dotenv for stripe
const express = require("express");
const router = express.Router();

//dotenv for stripe
const dotenv = require("dotenv");
dotenv.config();

//payment processing with stripe:
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)


//get home page

//req: im thinking just the cart map.
router.post('/', async (req, res, ) => {
    try{const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: req.body.cart.map(item => {
            return{
                price_data: {
                    currency: 'cad',
                    product_data: {
                        name: item.name
                    },
                    unit_amount: item.priceCents
                },
                quantity: 1
            }
        }),
        //look up how to do 
        success_url: `${process.env.SERVER_URL}/success.html`,
        cancel_url: `${process.env.SERVER_URL}/cancel.html`
    })
    res.json({url: session.url})
    }
    catch (e) {
        res.status(500).json({error: e.message})
    }
    
})

module.exports = router;