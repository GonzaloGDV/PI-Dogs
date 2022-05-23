const { Router } = require("express");
const {
  getTemperamentsFromDB,
} = require("../controllers/TemperamentControllers");

const router = Router();
router.use("/", getTemperamentsFromDB);

module.exports = router;
