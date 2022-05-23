const { Router } = require("express");
// Importar todos los routers;
const dogRoutes = require("./dogRoutes");
const temperamentRoutes = require("./temperamentRoutes");

const router = Router();

// Configurar los routers
router.use("/dogs", dogRoutes);
router.use("/temperament", temperamentRoutes);

module.exports = router;
