const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CSE 341 Project 2 API',
    description: 'Project 2'
  },
  host: 'cse341-4p35.onrender.com'
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);