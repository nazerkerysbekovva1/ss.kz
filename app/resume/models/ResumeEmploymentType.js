const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db'); // Import the Sequelize connection
const Resume = require('./Resume')
const EmploymentType = require('../../employment-type/EmploymentType')

const ResumeEmploymentTypes = sequelize.define('ResumeEmploymentTypes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
}, {
    timestamps: false,
});

// ResumeEmploymentTypes.belongsToMany(Resume, { through: 'resumeId' }); 
// ResumeEmploymentTypes.belongsToMany(EmploymentType, { through: 'employmentTypeId' }); 

Resume.belongsToMany(EmploymentType, { through: ResumeEmploymentTypes, foreignKey: 'resumeId', otherKey: 'employmentTypeId', as: "employmentTypes" }); 
EmploymentType.belongsToMany(Resume, { through: ResumeEmploymentTypes, foreignKey: 'employmentTypeId', otherKey: 'resumeId' }); 


// Resume.hasMany(ResumeEmploymentTypes, {
//   foreignKey: 'resumeId'
// });

// EmploymentType.hasMany(ResumeEmploymentTypes, {
//   foreignKey: 'employmentTypeId'
// });

module.exports = ResumeEmploymentTypes;
