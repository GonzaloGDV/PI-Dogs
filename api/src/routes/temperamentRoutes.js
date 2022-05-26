const { Router } = require("express");
const {
  getTemperamentsFromDB,
} = require("../controllers/TemperamentControllers");

const router = Router();
router.use("/", getTemperamentsFromDB);

// GET /temperament:
// Obtener todos los temperamentos posibles
// En una primera instancia deberán obtenerlos desde la API externa
// y guardarlos en su propia base de datos y luego ya utilizarlos
// desde allí
router.get("/", (req, res) => {});

module.exports = router;
