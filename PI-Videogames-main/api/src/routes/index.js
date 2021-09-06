const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const generalLogic = require('./routeLogic/generalLogic.js')
const getGeneros = require('./routeLogic/getGeneros.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', generalLogic)
router.use('/genres', getGeneros)


module.exports = router;
