const router = require('express').Router();

router.get('/', (req, res) =>{
    // #swagger.tags = ['Home']
    res.send('Hi there!')
});

router.use('/products', require('./products'));

router.use('/users', require('./users'));

module.exports = router;