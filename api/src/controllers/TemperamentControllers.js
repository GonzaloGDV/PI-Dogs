const axios = require("axios");
const { Temperament } = require("../db");

async function getAllTemperaments() {
  try {
    let temperaments = (
      await axios("https://api.thedogapi.com/v1/breeds")
    ).data.map((e) => ({
      ID: e.id,
      name: e.name,
    }));
    await Temperament.bulkCreate(temperaments);
    console.log("Temperaments loaded in DB");
  } catch (error) {
    console.log(error);
  }
}

function getTemperamentsFromDB(req, res, next) {
  Temperament.findAll()
    .then((temperaments) => res.send(temperaments))
    .catch((e) => next(e));
}

module.exports = {
  getAllTemperaments,
  getTemperamentsFromDB,
};
