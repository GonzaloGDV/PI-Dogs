const { Router } = require("express");
const { Dog, Temperament } = require("../db");

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { name, height, weight, life_span, image, temperament } = req.body;

    const createDog = await Dog.create({
      name,
      height,
      weight,
      life_span,
      image,
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
