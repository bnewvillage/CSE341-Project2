const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const User = require('../models/users');
const { validationResult } = require('express-validator');

const getAll = async (req, res) => {
    // #swagger.tags = ['User']
    try {
        const users = await mongodb.getDatabase().db().collection('users').find().toArray();
        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No data found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message || 'Internal Server Error' });
    }
};

const createUser = async (req, res) => {
    // #swagger.tags = ['User']
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        role: req.body.role
    });
    
    try {
        const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
        if (response.acknowledged) {
            res.status(201).json({ message: 'Created user successfully.', user });
        } else {
            res.status(500).json({ message: 'Something went wrong while creating user.' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'An error occurred while creating user.' });
    }
};

const updateUser = async (req, res) => {
    // #swagger.tags = ['User']
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const userId = new ObjectId(req.params.id);
        const user = {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            role: req.body.role
        };
        
        const response = await mongodb.getDatabase().db().collection('users').replaceOne({ _id: userId }, user);
        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'User updated successfully', user });
        } else {
            res.status(500).json({ message: 'No user was updated. Ensure the user ID is correct.' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'An error occurred while updating user.' });
    }
};

const deleteUser = async (req, res) => {
    // #swagger.tags = ['User']
    try {
        const userId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId });
        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'Deleted successfully.' });
        } else {
            res.status(500).json({ message: 'No user was deleted. Ensure the user ID is correct.' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'An error occurred while deleting the user.' });
    }
};

module.exports = {
    getAll,
    createUser,
    updateUser,
    deleteUser
};
