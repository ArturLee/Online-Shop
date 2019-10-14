const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const products = [];

// /admin/add-product => GET
router.get('/add-product',(req,res,nxt) =>{
    res.render('add-product',{pageTitle: 'Add Product', path: '/admin/add-product', activeProduct:true, formsCSS:true, productCSS:true});//res.sendFile(path.join(rootDir, 'views', 'add-product.html'));///Users/arturlee/Desktop/NodeJS/views/add-product.html
});
// /admin/add-product => POST
router.post('/add-product',(req,res,nxt)=>{
    products.push({title: req.body.title});
    res.redirect('/');
});

exports.routes = router;
exports.products = products;