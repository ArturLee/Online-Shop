exports.get404 = (req,res,nxt)=>{
    res.status(404).render('404', {pageTitle: 'Page not found!'});
};