//importing modules
// - log and error debug tools -
const errors = require('debug')('api:g_errors');
const log = require('debug')('api:g_log');

// sequelize models
const { Guiders } = require('../../models');


//get the login guider
exports.getLoginGuider = async (req, res) => {
    const { email, password } = req.body;
    try {
        const guider = await Guiders.findAll({ where: { email } })
            .catch(err => errors(err));
        if (guider[0].password === password) {
            res.status(200).json(guider[0]);
        } else {
            res.status(404).json("email or password don't match");
        }
   } catch (error) {
        errors(error);
   }
}
//update guider's information
exports.editGuider = async (req, res) => {
    const { id } = req.query;
    const {
        name,
        lastname,
        email,
        password,
        home_state,
        home_town,
        licences
    } = req.body;
    log(id);
    try {
        const guider = await Guiders.findByPk(id)
            .catch(err => errors(err));
            guider.name = name;
            guider.lastname = lastname;
            guider.email = email;
            guider.password = password;
            guider.home_state = home_state;
            guider.home_town = home_town;
            guider.licences = licences;
            guider.save();
        log(guider)
        res.status(200).json(guider);
        
    } catch (err) {
        errors(err);
    }
}
// create guider's account
exports.createGuider = async (req, res) => {
    const {
        name,
        lastname,
        email,
        password,
        home_state,
        home_town,
        licences
    } = req.body;
    try {
        const newGuider = await Guiders.create({
            name,
            lastname,
            email,
            password,
            home_state,
            home_town,
            licences,
        }).catch(err => {
            errors(err);
            return new Error(err);
        });

        if (newGuider === null) {
            return new Error('unable to  create new use');
        } else {
            res.status(202).json({ id: newGuider.id });
        }
    } catch (err) {
        errors(err);
        res.status(500).json();
    }
}
// delete guider's account
exports.deleteGuider = async (req, res) => {
    const { id } = req.query;
    try {
        await Guiders.destroy({ where: { id } })
            .catch( err => errors(err));
        res.status(200).json('profile is successfully deleted');
    } catch (err) {
        res.status(500).json(err);
    }
}