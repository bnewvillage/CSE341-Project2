const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const Product = require('../models/products');
const {validationResult} = require('express-validator');

const getAll = async (req, res) =>{
    // #swagger.tags = ['Product']
    try {
        await mongodb.getDatabase().db().collection('products').find().toArray()
        .then((products, err) =>{
            if (products.length === 0) {
                return res.status(404).json({message: 'No data found'});
            }
            if (err) {
                return res.status(505).json({message: err});
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(products);
        })
        .catch((err) =>{
            res.status(500).json({message: err.message || 'Internal Server Error'});
        });
    } catch (error) {
        res.status(500).json({message: error.message || 'Internal Server Error'});
    }
};

const createProduct = async (req,res) =>{
    // #swagger.tags = ['Product']
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    } else {
        const product = new Product ({
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            stock: req.body.stock
        })
        try {
            const response = await mongodb.getDatabase().db().collection('products').insertOne(product);
            if (response.acknowledged){
                res.status(201).json({message: 'Created product successfully.', product: product});
            } else {
                res.status(500).json({message: 'Something went wrong while creating product.'});
            }
        } catch (error) {
            res.status(500).json({message: error.message || 'Some error occurred while updating product data.'})
        }
    }
};

const updateProduct = async (req, res) =>{
    // #swagger.tags = ['Product']
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    } else {
        try {
            const productId = new ObjectId(req.params.id);
            const product = {
                name: req.body.name,
                price: req.body.price,
                category: req.body.category,
                stock: req.body.stock,
                description: req.body.description,
                brand: req.body.brand,
                rating: req.body.rating
            };
            const response = await mongodb.getDatabase().db().collection('products').replaceOne({_id: productId}, product);
            if (response.modifiedCount > 0){
                res.status(200).json({message: 'Product updated successfully', product: product});
            } else {
                res.status(500).json(response.error || 'Something went wrong while updating product.');
            }
        } catch (error) {
            res.status(500).json({message: error.message || 'Some error occurred while updating product data.'});
        }
    }
};


const deleteProduct = async (req, res) =>{
    // #swagger.tags = ['Product']
    try {
        const productId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('products').deleteOne({_id: productId});
        if (response.deletedCount > 0){
            res.status(200).json({message: 'Deleted successfully.'})
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the product.');
        }
    } catch (error) {
        res.status(500).json({message: error.message || 'Some error occurred while deleting the product.'});
    }
};

module.exports = {
    getAll,
    createProduct,
    updateProduct,
    deleteProduct
};
