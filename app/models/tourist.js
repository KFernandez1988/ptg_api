const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tourist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Tourist.init({
    id: {
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 10],
          msg: 'name is either to long or to short'
        }
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 10],
          msg: 'last name is either to long or to short'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
      validate: {
        isEmail: {
          msg: "Please enter a email address",
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        passwordValidation(valid) {
          const hasUpperCaseChar = new RegExp("(?=.*[A-Z])");
          const hasSpecialChar = new RegExp("(?=.*[!@#$%^&*])");
          let errors = [];

          if (valid.length < 2) {
            errors.push('Password is to short');
          }
          if (!hasUpperCaseChar.test(valid)) {
            errors.push('Password needs aupper case letter');
          }
          if (!hasSpecialChar.test(valid)) {
            errors.push('Password needs a special character');
          }

          if (errors.length > 0) {
            return new Error(errors);
          } else {
            // everithing is good
          }
        }
      }
    },
    home_state: DataTypes.STRING,
    home_town: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tourist',
  });
  return Tourist;
};