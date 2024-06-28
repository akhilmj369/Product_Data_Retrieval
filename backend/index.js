const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 5000;
require("dotenv").config();
const Shopify = require('shopify-api-node');

const shopify = new Shopify({
  shopName: process.env.STORE_URL,
  apiKey: process.env.API_KEY,
  password: process.env.ACCESS_TOKEN
});

app.use(cors());

app.get('/',(req, res) =>{
    res.send(`<h1>Our app is running...</h1>`)
})


app.get('/products',async(req, res) =>{
    await shopify.product.list()
    .then((products) => res.send(products))
    .catch((err) => res.status(500).send({ error: err.message }));

})

app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}.....`)
})