const { Router } = require('express');
const { getdogs, getbreed, getTemeperaments, postDogs} = require ("./dogs");


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/dogs", getdogs);
router.get("/dogs/:idRaza", getbreed);
router.get("/temperament", getTemeperaments);
router.post("/dog", postDogs);


module.exports = router;
