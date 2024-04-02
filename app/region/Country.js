const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db'); // Import the Sequelize connection

const Country = sequelize.define('Country', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
    timestamps: false,
});

module.exports = Country;
