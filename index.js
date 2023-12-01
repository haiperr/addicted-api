const express = require('express');
const cors =  require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const app = express();

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.set('Access-Control-Allow-Origin', req.headers.origin)
    res.set('Access-Control-Allow-Credentials', 'true')
    res.set('Access-Control-Allow-Credentials', 'true')
    next();
}

app.use(allowCrossDomain);
app.use(cors({credentials: true, origin: ['http://25.43.246.4:5000/']}));

// Express Session Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
    next();
});

app.use(
    session({
        secret: 'ASGVBACBAVHOROXEGAYSABASAJBAVBAAVHCBAHVB',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60000 * 60 * 24 * 7},
        store: MongoStore.create({
            mongoUrl: 'mongodb://localhost:27017/',
            touchAfter: 60 * 1, // time period in seconds
            dbName: 'andromeda',
            autoRemove: 'native'
          })
    })
);

const port = process.env.PORT || 5000;

// Files
const posts = require('./routes/api/posts');
const auth = require('./routes/api/auth');
const rcon = require('./routes/api/rcon');
const stats = require('./routes/api/stats-file');
app.use('/api', posts);
app.use('/api', auth);
app.use('/api', rcon);
app.use('/api', stats);

app.listen(port, () => console.log(`Server started on port ${port}`));