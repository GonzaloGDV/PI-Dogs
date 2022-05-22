const { Router } = require("express");

// Importar todos los routers;
const dogsRoutes = require("./dogsRoutes");

const router = Router();

// Configurar los routers
router.use("/dogs", dogsRoutes);

module.exports = router;
