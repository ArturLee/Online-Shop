const path = require('path');

const express = require('express');
const bodyparser= require('body-parser');

const app = express();

app.set('view engine', 'pug');
app.set('views','views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyparser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin',adminData.routes);
app.use(shopRoutes);

app.use((req,res,nxt)=>{
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
});

app.listen(3000); 
