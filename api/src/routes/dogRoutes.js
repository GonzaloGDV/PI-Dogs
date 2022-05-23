const { Router } = require("express");
const { getAllDogs } = require("../controllers/DogControllers");

const router = Router();
router.use("/", getAllDogs);

module.exports = router;
