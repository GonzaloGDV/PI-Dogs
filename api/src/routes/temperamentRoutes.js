const { Router } = require("express");
const {
  getTemperamentsFromDB,
} = require("../controllers/TemperamentControllers");

const router = Router();

router.get("/", async (req, res) => {
  const totalTemperaments = await getTemperamentsFromDB();
  try {
    res.status(200).send(totalTemperaments);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
