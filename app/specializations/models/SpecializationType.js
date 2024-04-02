const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db'); // Import the Sequelize connection


const SpecializationType = sequelize.define('SpecializationType', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
    timestamps: false,
});


module.exports = SpecializationType;
