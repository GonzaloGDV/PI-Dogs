const axios = require("axios");

async function getAllDogs(req, res, next) {
  try {
    let dogs = (await axios("https://api.thedogapi.com/v1/breeds")).data;
    res.send(dogs);
  } catch (error) {
    next(error);
  }
}
module.exports = {
  getAllDogs,
};
