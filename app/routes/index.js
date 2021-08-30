const router = require('express').Router();

const authRouters = require('./authentication');
const touristRouters = require('./tourists');
const guidersRouters = require('./guiders');
const locationRouters = require('./locations');


router.use('/api/guiders', guidersRouters);

router.use('/api/tourists', touristRouters);

router.use('/api/locations', locationRouters);



module.exports = router;