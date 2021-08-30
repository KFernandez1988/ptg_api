const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({ n: "hellos from auth" });
});


module.exports = router;