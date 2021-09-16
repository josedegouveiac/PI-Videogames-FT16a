const axios = require('axios')
const { Router } = require('express');
const router = Router();
const { Videogame, Genero } = require('../../db')
const {
    API_KEY
} = process.env;

// ------------ LOGIC -------------//

const informationApi = async () => {
    let all = []
    try {
        const api = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
        const res = await api.data.results;

        const one = await axios.get(api.data.next)
        const result1 = one.data.results;

        const two = await axios.get(one.data.next)
        const result2 = two.data.results;

        const tree = await axios.get(two.data.next)
        const result3 = tree.data.results;

        const four = await axios.get(tree.data.next)
        const result4 = four.data.results;

        const allResults = [...res, ...result1, ...result2, ...result3, ...result4]

        all = allResults.map(el => {
            return {
                id: el.id,
                name: el.name,
                image: el.background_image,
                description: el.description,
                released: el.released,
                rating: el.rating,
                platforms: el.platforms.map(el => el.platform.name),
                generos: el.genres.map(el => el.name)
            }
        })
        return all


    } catch (error) {
        console.log(error, "no esta funcionando")
    }
}

const informationDB = async () => {

    return await Videogame.findAll({
        include: {
            model: Genero,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })

}

const totalInformation = async () => {
    const api = await informationApi()
    const db = await informationDB()
    const information = [...api, ...db]
    return information
}

// const filter = async (id) => {
//     if (isNaN(id)) {
//         return await Videogame.findOne({
//             where: {
//                 id: id
//             }, include: {
//                 model: Genero,
//                 attributes: ['name'],
//                 through: {
//                     attributes: []
//                 }
//             }

//         });
//     } else {
//         const i = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
//         return {
//             id: i.data.id,
//             createdinDb: false,
//             name: i.data.name,
//             image: i.data.background_image,
//             description: i.data.description,
//             released: i.data.released,
//             rating: i.data.rating,
//             platforms: i.data.platforms.map(el => el.platform.name),
//             generos: i.data.genres.map(el => el.name)
//         }
//     }
// }

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
// if (id) {
//     res.status(200).send(allgames)
// } else {
//     res.status(404).send('Id no Encontrado')
// }

router.post('/', async (req, res) => {
    let {
        id,
        name,
        image,
        description,
        released,
        rating,
        platforms,
        generos,
        createdinDb
    } = req.body

    const gamecreated = await Videogame.create({
        id,
        name,
        image,
        description,
        released,
        rating,
        platforms,
        createdinDb
    })

    let generoDb = await Genero.findAll({
        where: { name: generos }
    })

    gamecreated.addGenero(generoDb)
    res.status(200).send('videojuego creado con exito')
})



module.exports = router;
