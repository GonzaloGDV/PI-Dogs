const axios = require("axios");
const { Temperament } = require("../db");
let temperamentsArray2 = [];
let temperamentsArrayFinal = [];

//async function getAllTemperaments() {
const getAllTemperaments = async () => {
  try {
    let temperaments = (
      await axios("https://api.thedogapi.com/v1/breeds")
    ).data.map((e) => {
      return {
        id: e.id,
        name: e.temperament,
      };
    });

    const temperamentsArray = temperaments
      .map((e) => e.name)
      .join(",")
      .split(",");
    for (let i = 1; i < temperamentsArray.length; i++) {
      temperamentsArray2.push(temperamentsArray[i].trim());
    }
    for (let i = 1; i < temperamentsArray2.length; i++) {
      if (!temperamentsArrayFinal.includes(temperamentsArray2[i])) {
        temperamentsArrayFinal.push(temperamentsArray2[i]);
      }
    }
    await Temperament.bulkCreate(temperaments);
    //console.log(temperamentsArrayFinal);
    //console.log(temperaments);
    console.log("Temperaments loaded in DB");
  } catch (error) {
    console.log(error);
  }
};

function getTemperamentsFromDB(req, res, next) {
  Temperament.findAll()
    .then((temperaments) => res.send(temperaments))
    .catch((e) => next(e));
}

module.exports = {
  getAllTemperaments,
  getTemperamentsFromDB,
};
