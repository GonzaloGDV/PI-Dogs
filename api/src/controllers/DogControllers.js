const axios = require("axios");
const { API_KEY } = process.env;

const getAllDogs = async () => {
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
      };
    });
    return dogs;
  } catch (error) {
    console.log(error);
  }
};

const getNamedDogs = async (name) => {
  try {
    let dogs = (
      await axios(
        `https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${API_KEY}`
      )
    ).data.map((e) => {
      console.log(e);
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

module.exports = {
  getAllDogs,
  getNamedDogs,
};
