const express = require('express');
const app = express();
const mongoDb = require('./data/database');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const PORT = process.env.PORT || 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DETELE, OPTIONS');
    next();
})

app.use('/',require('./routes'));

mongoDb.initDb((err) =>{
    if(err) {
        console.log(err);
    } else {
        app.listen(PORT, ()=>{
            console.log(`Database is listening and node running on port: ${PORT}`);
        });
    };
});