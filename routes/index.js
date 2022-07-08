const express = require('express');

const all_data = require('../data/data')

// const all_data = require('../data/all_data')
// const all_data = require('../data/all_data.js')

const Cart = require('../data/cart_data');

const router = express.Router();

let currentAll_dataId = 18;

router.get('/', (req,res) =>{
    res.render('index', {
        title: 'Home | FREITAG',
        isTitle : true
    });
});

router.get('/bags/backpack/', (req,res) =>{
    res.render('all_pages', {
        title: "Backpacks | FREITAG",
        cats: 'Backpacks',
        isTitle : true,

        all_data: all_data.filter((all_data) =>{
            return all_data.category == 'backpack'
        })
    });
});

router.get('/bags/backpack/:id', (req,res) =>{
    const bagsId = Number.parseInt(req.params.id, 10);

        res.render('all_products',{
            title: all_data.name,
            all_data: all_data.filter((all_data) =>{
                return all_data.id == bagsId
            })
        });
});

router.get('/bags/messenger', (req,res) =>{
    res.render('all_pages', {
        title: "Messenger | FREITAG",
        cats: 'Messenger Bags',
        isTitle : true,
        all_data: all_data.filter((all_data) =>{
            return all_data.category == 'messenger'
        })
    });
});

router.get('/bags/messenger/:id', (req,res) =>{
    const bagsId = Number.parseInt(req.params.id, 10);

    res.render('all_products',{
        all_data: all_data.filter((all_data) =>{
            return all_data.id == bagsId
        })
    });
});

router.get('/bags/tote', (req,res) =>{
    res.render('all_pages', {
        title: "Shopper & Tote Bags | FREITAG",
        cats: 'Shopper & Tote Bags',
        isTitle : true,
        all_data: all_data.filter((all_data) =>{
            return all_data.category == 'tote'
        })
    });
});

router.get('/bags/tote/:id', (req,res) =>{
    const bagsId = Number.parseInt(req.params.id, 10);

    res.render('all_products',{
        all_data: all_data.filter((all_data) =>{
            return all_data.id == bagsId
        })
    });
});

router.get('/accessories/wallets', (req,res) =>{
    res.render('all_pages', {
        title: "Wallets | FREITAG",
        cats: 'Wallets',
        isTitle : true,
        all_data: all_data.filter((all_data) =>{
            return all_data.category == 'wallets'
        })
    });
});

router.get('/accessories/wallets/:id', (req,res) =>{
    const bagsId = Number.parseInt(req.params.id, 10);

    res.render('all_products',{
        all_data: all_data.filter((all_data) =>{
            return all_data.id == bagsId
        })
    });
});

router.get('/accessories/cases', (req,res) =>{
    res.render('all_pages', {
        title: "Cases & Sleeves | FREITAG",
        cats: 'Cases & Sleeves',
        isTitle : true,
        all_data: all_data.filter((all_data) =>{
            return all_data.category == 'cases'
        })
    });
});

router.get('/accessories/cases/:id', (req,res) =>{
    const bagsId = Number.parseInt(req.params.id, 10);

    res.render('all_products',{
        all_data: all_data.filter((all_data) =>{
            return all_data.id == bagsId
        })
    });
});

router.get('/accessories/toiletry', (req,res) =>{
    res.render('all_pages', {
        title: "Toiletry Bags | FREITAG",
        cats: 'Toiletry Bags',
        isTitle : true,
        all_data: all_data.filter((all_data) =>{
            return all_data.category == 'toiletry'
        })
    });
});

router.get('/accessories/toiletry/:id', (req,res) =>{
    const bagsId = Number.parseInt(req.params.id, 10);

    res.render('all_products',{
        all_data: all_data.filter((all_data) =>{
            return all_data.id == bagsId
        })
    });
});

router.get('/add-to-cart/:id', (req, res) => {
    let productId = Number.parseInt(req.params.id, 10);
    let cart = new Cart(req.session.cart ? req.session.cart : {items: {}});
    let product = all_data.find((product) => product.id === productId)

    cart.add(product, product.id, product.imgCart);
    req.session.cart = cart;
    res.render('all_products',{
        all_data: all_data.filter((all_data) =>{
            return all_data.id == product.id;
        })
    })
})

router.get('/checkout', (req, res) => {
    if (!req.session.cart) {
        return res.render('checkout', {
            title: 'Checkout | FREITAG',
            isTitle : true,
            products: null
        });
    }

    let cart = new Cart(req.session.cart);
    res.render('checkout',{
        title: 'Checkout | FREITAG',
        isTitle : true,
        products: cart.generateArray(), 
        totalPrice: cart.totalPrice
    })
})

router.get('/checkout/:id', (req, res) => {
    let productId = Number.parseInt(req.params.id, 10);
    let cart = new Cart(req.session.cart ? req.session.cart : {items: {}});
    let product = all_data.find((product) => product.id === productId)

    cart.add(product, product.id, product.imgCart);
    req.session.cart = cart;
    console.log(req.session.cart)
    res.render('checkout',{
        title: 'Checkout | FREITAG',
        isTitle : true,
        products: cart.generateArray(), 
        totalPrice: cart.totalPrice
    })
})

router.get('/buy', (req, res) => {
    req.session.cart = null;
    res.redirect('/')
})

router.get('/addProductPage', (req,res) => {
    res.render('addProductPage')
});

router.post('/addProduct', (req,res) => {
    currentAll_dataId +=1;
    const name = req.body.name;
    const type = req.body.type;
    const category = req.body.category;
    const imgCart = req.body.imgCart;
    const desc = req.body.desc;
    const detail = req.body.detail;
    const price = req.body.price;
    const imgUrl = req.body.imgUrl;
    const material = req.body.material;
    const dimension = req.body.dimension;

    const newBag = {
        id: currentAll_dataId,
        name,type,category,imgCart,desc,detail,price,imgUrl,material,dimension
    };
    all_data.push(newBag);
    console.log(newBag)
    res.redirect('/')
});

module.exports = router;