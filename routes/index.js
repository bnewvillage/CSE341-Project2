const router = require('express').Router();

router.get('/', (req, res) =>{
    res.send('Hi there!')
});

router.use('/products', require('./products'));

module.exports = router;