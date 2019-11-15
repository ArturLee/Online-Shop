const Product = require('../models/products');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
      });
    }).catch(err => {
      console.log(err)
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // Product.findAll({where: {id: prodId}})
  // .then(products => {
  //   res.render('shop/product-detail', {
  //     product: products[0],
  //     pageTitle: products[0].title,
  //     path: '/products'
  //   });
  // })
  //  .catch(err => console.log(err))
  Product.findByPk(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    }).catch(err => console.log(err))
};

exports.getIndex = (req, res, nxt) => {
  Product.fetchAll()
    .then(product => {
      res.render('shop/index', {
        prods: product,
        pageTitle: 'Shop',
        path: '/'
      });
    }).catch(err => {
      console.log(err)
    });
};

exports.getCart = (req, res, nxt) => {
  req.user
    .getCart()
    .then(products => {
      res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
        products: products
      });
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then(product => {
      console.log(product)
      return req.user.addToCart(product);
    }).then(result => {
      console.log(result)
      res.redirect('/cart');
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .deleteItemFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .addOrder()
    .then(result => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err))
}

exports.getOrders = (req, res, nxt) => {
  req.user.getOrders()
    .then(orders => {
      res.render('shop/orders', {
        //prods: products,
        pageTitle: 'Your order',
        path: '/orders',
        order: orders
      });
    })
    .catch(err => console.log(err));
};

exports.getCheckout = (req, res, nxt) => {
  res.render('shop/checkout', {
    //prods: products,
    pageTitle: 'Checkout',
    path: '/checkout',
  });
}