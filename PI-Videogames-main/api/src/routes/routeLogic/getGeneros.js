const axios = require('axios')
const { Router } = require('express');
const router = Router();
const { Videogame, Genero } = require('../../db')
const {
    API_KEY
} = process.env;


router.get('/', async (req, res) => {
    let generos = []
    const api = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    generos = await api.data.results.map(el => el.name)
    generos.forEach(el => {
        Genero.findOrCreate({
            where: { name: el }
        });
    });
    const allgeneros = await Genero.findAll()
    res.send(allgeneros)
})


module.exports = router;