const axios = require("axios");
const { Temperament } = require("../db");
const { API_KEY } = process.env;
const temperamentsArray2 = [];
const temperamentsArrayFinal = [];

const getAllTemperaments = async () => {
  try {
    let temperaments = (
      await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
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
      if (temperamentsArray2[i])
        temperamentsArrayFinal.push(temperamentsArray2[i]);
    }

    temperamentsArrayFinal.forEach((temp) => {
      Temperament.findOrCreate({
        where: { name: temp },
      });
    });

    console.log("Temperaments loaded in DB");
  } catch (error) {
    console.log(error.message);
  }
};

const getTemperamentsFromDB = async () => {
  const totalTemperaments = await Temperament.findAll();
  try {
    return totalTemperaments;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getAllTemperaments,
  getTemperamentsFromDB,
};
