const { Router } = require("express");
const {
  getAllDogs,
  //getNamedDogs,
  //getIdDog,
} = require("../controllers/DogControllers");

const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    const allDoguis = await getAllDogs();
    //allDoguis = allDoguis.filter((e) => e.weight !== "NaN");

    if (name) {
      const filteredDogs = allDoguis.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );
      filteredDogs.length
        ? res.status(200).send(filteredDogs)
        : res.status(404).send(`${name} breed does not exist`);
    } else {
      res.status(200).send(allDoguis);
    }
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/:id", async (req, res) => {
  const doguis = await getAllDogs();
  const { id } = req.params;
  try {
    const idDog = doguis.find((e) => e.id == id);
    if (idDog) {
      res.status(200).send(idDog);
    } else {
      res.status(404).send(`Breed id ${id} does not exist`);
    }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
