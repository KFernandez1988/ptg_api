const router = require('express').Router();

const ctrl = require('../../controllers/guiders');


router.get('/login', ctrl.getLoginGuider);

router.post('/signup', ctrl.createGuider);

router.put('/edit', ctrl.editGuider);

router.delete('/delete/account', ctrl.deleteGuider);

module.exports = router;