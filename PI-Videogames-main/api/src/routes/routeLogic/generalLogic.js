const axios = require('axios')
const { Router } = require('express');
const router = Router();
const { Videogame, Genero } = require('../../db')
const {
    API_KEY
} = process.env;

// ------------ LOGIC -------------//

const informationApi = async () => {
    try {
        const api = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
        const results = await api.data.results.map(el => {
            return {
                name: el.name,
                id: el.id,
                description: el.description,
                released: el.released,
                rating: el.rating,
                platforms: el.platforms.map(el => el.platform.name)
            }
        })
        return results


    } catch (error) {
        console.log(error, "no esta funcionando")
    }
}

const informationDB = async () => {

    return await Videogame.findAll({
        include: Genero,
        attributes: ['name'],
        through: {
            attributes: []
        }
    })

}

const totalInformation = async () => {
    const api = await informationApi()
    const db = await informationDB()
    const information = [...api, ...db]
    return information
}

// ------------ LOGIC -------------//


// ------------ ROUTES -------------//

router.get('/', async (req, res) => {
    const name = req.query.name
    const videogames = await totalInformation()
    if (name) {
        const names = videogames.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        if (names.length) {
            res.status(200).send(names)
        } else {
            res.status(404).send('Not Found')
        }
    } else {
        res.status(200).send(videogames)
    }
})

router.get('/:id', async (req, res) => {
    let allgames = await totalInformation()
    let id = req.params.id;
    if (id) {
        let ids = await allgames.filter(el => el.id == id);
        ids.length ?
            res.status(200).send(ids) :
            res.status(404).send('Not found')
    } else {
        res.send(allgames)
    }

})

router.post('/', async (req, res) => {
    let {
        id,
        name,
        description,
        released,
        rating,
        platforms
    } = req.body

    const gamecreated = await Videogame.create({
        id,
        name,
        description,
        released,
        rating,
        platforms
    })

    let generoDb = await Genero.findAll({
        where: { name: name }
    })

    gamecreated.addGenero(generoDb)
    res.status(200).send('videojuego creado con exito')
})



module.exports = router;
