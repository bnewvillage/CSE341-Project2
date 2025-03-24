const Express = require('express');
const app = Express();

const indexRouter = require('./routes/index');

app.listen()

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
});

            