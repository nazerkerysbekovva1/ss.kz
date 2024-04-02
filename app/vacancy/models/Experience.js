const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db'); // Import the Sequelize connection

const Experience = sequelize.define('Experience', {
  duration: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
    timestamps: false,
});

module.exports = Experience;
