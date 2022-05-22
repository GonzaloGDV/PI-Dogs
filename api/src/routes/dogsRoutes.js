const { Router } = require("express");
const { getAllDogs } = require("../controllers/dogsControllers");

const router = Router();

router.use("/", getAllDogs);

module.exports = router;
