const jwt = require('jsonwebtoken');
const debug = require('debug')('api:proc:');
const errors = require('debug')('api:proc:ERRORS');

exports.protectedRoute = (req, res, next) => {
    const { token } = req.headers;
    try {
        const { id } = jwt.verify(token, process.env.SECRET);
        debug(token);
        debug(id);
        debug(process.env.SECRET);
            req.userId = id;
            return next();
        
    } catch (err) {
        errors(err);
        res.status(404).json({ loggedIn: false });
    }
}