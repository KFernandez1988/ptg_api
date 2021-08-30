const express = require('express');
const morganD = require('morgan-debug');
const session = require('express-session');
const API = require('../utilities/http');


const app = express();
const FileStore = require('session-file-store')(session);
const routers = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({

    secret: "PARADISE_FOREVER",
    resave: false,
    saveUninitialized: false,
    store: new FileStore
}));

app.use((req, res, next) => {
    console.log(req.session.user);
    next();
})

app.use(morganD('db:request', 'dev'));
app.use(API);

app.use('/', routers);

app.use((err, req, res, next) => {
    error('ERROR FOUND:', err);
    res.sendStatus(500);
})


module.exports = app;