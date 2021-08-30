// create all controllers(logic) for tourist
const errors = require('debug')('api:t_errors');
const log = require('debug')('api:t_log');

// sequelize model for tourists
const { Tourist } = require('../../models');

// get a tourist information
exports.getTourist = async (req, res) => {
    const { email, password } = req.body;
    try {
        const tourist = await Tourist.findAll({ where: { email } })
            .catch(err => errors(err));
        if (tourist[0].password === password) {
            res.status(200).json(tourist[0]);
        } else {
            res.status(404).json("email or password don't match");
        }
   } catch (error) {
        errors(error);
   }
}

// get all tourist bookings

// create a new tourist
exports.createNewTourist = async (req, res) => {
    const {
        name,
        lastname,
        email,
        password,
        home_state,
        home_town
    } = req.body;
    try {
        const newTourist = await Tourist.create({
            name,
            lastname,
            email,
            password,
            home_state,
            home_town
        }).catch(err => {
            errors(err);
            return new Error(err);
        });

        if (newTourist === null) {
            return new Error('unable to  create new use');
        } else {
            res.status(202).json({ id: newTourist.id });
        }
    } catch (err) {
        res.status(500).json({ id: newTourist.id });
    }
}
// edit tourist
exports.editATourist = async (req, res) => {
    const {
        name,
        lastname,
        email,
        password,
        home_state,
        home_town
    } = req.body;
    try {
        const tourist = await Tourist.findByPk(req.userId)
            .catch(err => errors(err));
            tourist.name = name;
            tourist.lastname = lastname;
            tourist.email = email;
            tourist.password = password;
            tourist.home_state = home_state;
            tourist.home_town = home_town;
            tourist.save();
        log(tourist)
        res.status(200).json(tourist);
        
    } catch (err) {
        errors(err);
    }
}
// create a new booking

// cancel a booking

// delete a tourist profile
exports.deleteThisTourist = async (req, res) => {
    const { id } = req.query;
    try {
        await Tourist.destroy({ where: { id } })
            .catch( err => errors(err));
        res.status(200).json('profile is successfully deleted');
    } catch (err) {
        res.status(500).json(err);
    }
}