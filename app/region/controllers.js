const City = require('./City')
const Country = require('./Country')

const getCities = async (req, res) => {
    console.log("error");
    const cities = await City.findAll()
    console.log(cities);
    res.status(200).send(cities)
}

const getCountries = async (req, res) => {
    const countries = await Country.findAll()
    res.status(200).send(countries)
}

module.exports = {
    getCities,
    getCountries
}