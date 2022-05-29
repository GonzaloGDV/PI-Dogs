const axios = require("axios");
const { API_KEY } = process.env;
const { Dog, Temperament } = require("../db");

const getApiDogs = async () => {
  try {
    let dogs = (
      await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    ).data.map((e) => {
      return {
        id: e.id,
        name: e.name,
        height: e.height.metric,
        weight: e.weight.metric,
        life_span: e.life_span,
        image: e.image.url,
        temperament: e.temperament,
      };
    });
    return dogs;
  } catch (error) {
    console.log(error.message);
  }
};

const getDBDogs = async () => {
  try {
    const doguis = await Dog.findAll({
      include: {
        model: Temperament,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    return doguis;
  } catch (error) {
    console.log(error.message);
  }
};

const getAllDogs = async () => {
  try {
    const apiDogs = await getApiDogs();
    const DBDogs = await getDBDogs();
    const all = apiDogs.concat(DBDogs);
    return all;
  } catch (error) {
    console.log(error.message);
  }
};

const getNamedDogs = async (name) => {
  try {
    let dogs = (
      await axios(
        `https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${API_KEY}`
      )
    ).data.map((e) => {
      return {
        id: e.id,
        name: e.name,
        height: e.height.metric,
        weight: e.weight.metric,
        life_span: e.life_span,
      };
    });
    return dogs;
  } catch (error) {
    console.log(error.message);
  }
};

const getIdDog = async () => {
  try {
    let dogs = (
      await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    ).data.map((e) => {
      return {
        id: e.id,
        name: e.name,
        height: e.height.metric,
        weight: e.weight.metric,
        life_span: e.life_span,
        temperament: e.temperament,
      };
    });
    return dogs;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getAllDogs,
  getApiDogs,
  getNamedDogs,
  getDBDogs,
  getIdDog,
};
