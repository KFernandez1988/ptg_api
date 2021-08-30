const router = require('express').Router();

const ctrl = require('../../controllers/tourists');
const auth = require('../../controllers/auth');
const { protectedRoute } = require('../../../utilities/protectedRoute');

// get current tourist and authenticate
// get tourist setting info
// get all booking belonging to the current tourist
// get all friend of the current tourist
router.post('/login', auth.authenticateTourists);

router.post('/signup', ctrl.createNewTourist);

router.put('/edit', protectedRoute, ctrl.editATourist);

router.delete('/delete/account', protectedRoute, ctrl.deleteThisTourist);

module.exports = router;