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

    const dogsFiltered = dogs.filter((dog) => !dog.weight.includes("NaN"));

    const dogsFiltered2 = dogsFiltered.filter((dog) => dog.weight.length > 2);

    const dogsFiltered3 = dogsFiltered2.filter(
      (dog) => !dog.life_span.includes("Years")
    );

    const dogsFiltered4 = dogsFiltered3.filter((dog) => dog.temperament);

    return dogsFiltered4;
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
    const all = DBDogs.concat(apiDogs);
    return all;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getAllDogs,
  getApiDogs,
  getDBDogs,
};
