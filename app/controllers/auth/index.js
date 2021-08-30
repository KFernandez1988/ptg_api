const debug = require('debug')("api:auth:t:");
const jwt = require('jsonwebtoken');

const { Tourist } = require('../../models');


exports.authenticateTourists = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const tourist = await Tourist.findAll({
            where: { email },
        })
            .catch(err => errors(err));
        if (tourist[0].password === password) {
            const token = jwt.sign({ id: tourist[0].id }, process.env.SECRET);
            debug(token);
            debug(process.env.SECRET);
            tourist[0].dataValues.password = null;

            req.session.user = {
                token,
                loggedIn: true,
            }
            res.status(200).json(req.session.user);
        } else {
            res.status(404).json("email or password don't match");
        }
   } catch (error) {
        errors(error);
   }
}
