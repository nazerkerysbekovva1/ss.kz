const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db'); // Import the Sequelize connection

const EmploymentType = sequelize.define('EmploymentType', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
    timestamps: false,
});

module.exports = EmploymentType;
