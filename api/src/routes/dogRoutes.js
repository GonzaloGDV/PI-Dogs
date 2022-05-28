const { Router } = require("express");
const { getAllDogs, getNamedDogs } = require("../controllers/DogControllers");
const { Dog, Temperament } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const filteredDogs = await getNamedDogs(name);
      filteredDogs.length
        ? res.status(200).send(filteredDogs)
        : res.status(404).send(`${name} breed does not exist`);
    } else {
      const allDoguis = await getAllDogs();
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
    // ({
    //   where: { id },
    //   include: Temperament,
    // });
    if (idDog) {
      res.status(200).send(idDog);
    } else {
      res.status(404).send(`Breed id ${id} does not exist`);
    }
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, height, weight, life_span, temperament } = req.body;

    const createDog = await Dog.create({
      name,
      height,
      weight,
      life_span,
    });

    const temperamentDB = await Temperament.findAll({
      where: { name: temperament },
    });

    await createDog.addTemperament(temperamentDB);

    res.send(`Your ${name} breed has been created successfully`);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
