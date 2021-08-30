const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({ n: "hellos from locations" });
});


module.exports = router;