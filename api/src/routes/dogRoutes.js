const { Router } = require("express");
const { getAllDogs, getNamedDogs } = require("../controllers/DogControllers");

const router = Router();
//router.use("/", getAllDogs);

// GET /dogs?name="...":
// Obtener un listado de las razas de perro que contengan la palabra
// ingresada como query parameter
// Si no existe ninguna raza de perro mostrar un mensaje adecuado
router.get("/", async (req, res) => {
  console.log("ruta query");
  const { name } = req.query;
  const filteredDogs = await getNamedDogs(name);
  try {
    if (filteredDogs) {
      res.status(200).json(filteredDogs);
    } else {
      res.status(404).send("The race you are loking for does not exist");
    }
  } catch (error) {
    console.log(error);
  }
});

// GET /dogs:
// Obtener un listado de las razas de perro
// Debe devolver solo los datos necesarios para la ruta principal
router.get("/", async (req, res) => {
  console.log("ruta get/");
  const allDoguis = await getAllDogs();
  try {
    res.status(200).send(allDoguis);
  } catch (error) {
    console.log(error);
  }
});

// GET /dogs/{idRaza}:
// Obtener el detalle de una raza de perro en particular
// Debe traer solo los datos pedidos en la ruta de detalle de raza
// de perro
// Incluir los temperamentos asociados
router.get("/:id", async (req, res) => {
  console.log("ruta id");
  const allDoguis = await getAllDogs();
  const { id } = req.params;
  try {
    const filteredDogs = allDoguis.find((elem) => elem.id == id);
    if (filteredDogs) {
      res.status(200).json(filteredDogs);
    } else {
      res.status(404).send("The race id you are loking for does not exist");
    }
  } catch (error) {
    console.log(error);
  }
});

// POST /dog:
// Recibe los datos recolectados desde el formulario controlado de
// la ruta de creación de raza de perro por body
// Crea una raza de perro en la base de datos

module.exports = router;
