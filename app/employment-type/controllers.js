const EmploymentType = require('./EmploymentType')
const Resume = require('../resume/models/Resume')
const ResumeEmploymentType = require('../resume/models/ResumeEmploymentType')


const getEmploymentTypes = async (req, res) => {
    const employmentTypes = await EmploymentType.findAll()
    // console.log(employmentTypes);
    res.status(200).send(employmentTypes)
}


const getEmploymentTypesByPost = async (req, res) => {
    const resumeId = req.params.id;
    const employmentType = await ResumeEmploymentType.findAll({
        where: {
          resumeId,
          employmentTypeId,
        },
    });
    res.status(200).send(employmentType)
}

module.exports = {
    getEmploymentTypes
}