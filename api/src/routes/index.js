const { Router } = require("express");
// Importar todos los routers;
const dogRoutes = require("./dogRoutes");
const temperamentRoutes = require("./temperamentRoutes");
const dogsRoutes = require("./dogsRoutes");

const router = Router();

// Configurar los routers
router.use("/dog", dogRoutes);
router.use("/dogs", dogsRoutes);
router.use("/temperament", temperamentRoutes);

module.exports = router;
