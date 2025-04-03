const express = require('express');
const app = express();
const mongoDb = require('./data/database');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');
const bodyParser = require('body-parser');


const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const PORT = process.env.PORT || 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

app
.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());



app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})

.use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }))
.use(cors({ origin: '*' }))
.use("/", require("./routes/index.js"));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}
));

passport.serializeUser((user, done) => {
    done(null, user);
});
  
passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req,res) =>{
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")
});

app.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
(req, res) => {
    req.session.user = req.user;
    req.session.save(() => {
        res.redirect('/');
    });
}
);

mongoDb.initDb((err) =>{
    if(err) {
        console.log(err);
    } else {
        app.listen(PORT, ()=>{
            console.log(`Database is listening and node running on port: ${PORT}`);
        });
    };
});
  