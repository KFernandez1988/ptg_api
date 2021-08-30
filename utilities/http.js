const axios = require('axios');
const errorsLog = require('debug')('axios_api:ERRORS');
const api = (req, res, next) => {
    const instance = axios.create({
        baseURL: process.env.API_URL || 'http://localhost:3000',
    })
    
    instance.interceptors.request.use(async (config) => {
        const { token } = req.session;

        if (!token) {
            return config
        };

        return {
            ...config,
            headers: { common: { token } }
        };
    });
    
    instance.interceptors.response.use(res => {
        return res ? res.data : {};
    },
        (err) => {
            errorsLog(err);
    });

    req.API = instance;
    next();
}


module.exports = api;