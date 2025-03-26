const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const User = require('../models/users');
const {validationResult} = require('express-validator');

const getAll = async (req, res) =>{
    // #swagger.tags = ['User']
    await mongodb.getDatabase().db().collection('users').find().toArray()
    .then((users, err) =>{
        if (users.length === 0) {
            return res.status(404).json({message: 'No data found'});
        }
        if (err) {
            return res.status(505).json({message: err});
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    })
    .catch((err) =>{
        res.status(500).json({message: err.message || 'Internal Server Error'});
    });
};

const createUser = async (req,res) =>{
    // #swagger.tags = ['User']
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const user = new User ({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        role: req.body.role
    })
    try {
        const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
        if (response.acknowledged){
            res.status(201).json({message: 'Created user successfully.', user: user});
        } else {
            res.status(500).json({message: 'Something went wrong while creating user.'});
        }
    } catch (error) {
        res.status(500).json({message: err.message || 'Some error occured while updating user data.'})
    }
};

const updateUser = async (req, res) =>{
    // #swagger.tags = ['User']
    const userId = new ObjectId(req.params.id);
    const user = {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        role: req.body.role
    };
    const response = await mongodb.getDatabase().db().collection('users').replaceOne({_id: userId}, user);
        if (response.modifiedCount > 0){
            res.status(200).json({message: 'User updated successfully', user: user});
        } else {
            res.status(500).json(response.error || 'Something went wron while updating user.');
        }
};

const deleteUser = async (req, res) =>{
    // #swagger.tags = ['User']
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('users').deleteOne({_id: userId});
    if (response.deletedCount > 0){
        res.status(200).json({message: 'Deleted successfully.'})
    } else {
        res.status(500).json(response.error || 'Some error occrured while deleting the user.');
    }
};

module.exports = {
    getAll,
    createUser,
    updateUser,
    deleteUser
};