const path = require('path');

const express = require('express');
const bodyparser= require('body-parser');
//const expressHbs = require('express-handlebars');

const app = express();


//app.engine('handlebars', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout'}));
//app.set('view engine', 'handlebars');
app.set('view engine', 'ejs');
app.set('views','views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyparser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin',adminData.routes);
app.use(shopRoutes);

app.use((req,res,nxt)=>{
    res.status(404).render('404', {pageTitle: 'Page not found!'});
});

app.listen(3000); 
