var express = require('express');
var route = express.Router();
let Product = require('../models/Product.model')
route.get('/', (req, res, next) => {
    Product.find()
            .then(product => res.json(product))
            .catch(err => res.status(400).json('Error: '+ err));
    
          
})

route.get('/:id', (req, res, next) => {
    Product.findById(req.params.id) 
            .then(product => res.json(product))
            .catch(err => res.status(400).json('Error: '+ err))
})

route.post('/action', (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;
    const status = Boolean(req.body.status);
    

    const newProduct = new Product({
        name,
        price,
        status
    });
    newProduct.save()
            .then(() => res.json('Exercise add!'))
            .catch(err => res.status(400).json('Error: '+ err))
})

route.delete('/:id', (req, res, next) => {
    Product.findByIdAndDelete(req.params.id)
            .then(() => res.json('Exercise delete.'))
            .catch(err => res.status(400).json('Error: '+ err));
})


route.post('/update/:id', (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id)
            .then(product => {
                product.name = req.body.name;
                product.price = req.body.price;
                product.status = req.body.status;
                product.save()
                        .then(() => res.json('Exercise update!'))
                        .catch(err => res.status(400).json('Error: '+ err))
            })
            .catch(err => res.status(400).json('Error: '+err))
})



module.exports = route;