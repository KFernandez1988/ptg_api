'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      main_tourist_id: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Tourists',
          key: 'id',
        }
      },
      location_id: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Locations',
          key: 'id',
        }
      },
      touring_date: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Bookings');
  }
};