import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGames, filterGenres, filterCreated, filterName, getGenres, filterRating } from "../actions";
import { Link } from "react-router-dom";
import Card from "./card";
import Paginado from "./paginado"
import SearchBar from "./searchbar";
import "./home.css"


function Home() {

    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.videogames)
    const generos = useSelector((state) => state.genres)
    const [, setOrderRating] = useState('');

    const [currentPage, setCurrentPage] = useState(1)
    const [gamePerPage,] = useState(15)

    const [, setOrder] = useState(" ")

    const lastGame = currentPage * gamePerPage
    const firstGame = lastGame - gamePerPage

    let currentGames = allVideogames.slice(firstGame, lastGame)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getGames());
        dispatch(getGenres())
    }, [dispatch])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getGames());
    }
    function handleOrderRating(e) {
        dispatch(filterRating(e.target.value));
        setOrderRating(`Ordered ${e.target.value}`)
    }
    function handleFilterGenres(e) {
        dispatch(filterGenres(e.target.value))
    }
    function handleFilterCreated(e) {
        dispatch(filterCreated(e.target.value))
    }
    function handleOrderName(e) {
        e.preventDefault()
        dispatch(filterName(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value)

    }

    return (
        <div className="b">

            <div className="nav">
                <h1 onClick={e => { handleClick(e) }}>TopGames</h1>
                <div className="block1">
                    <select onChange={e => handleFilterGenres(e)} >
                        <option value=""> Generos</option>
                        {generos.map((f) => (
                            <option key={f.id} value={f.name}>{f.name}</option>
                        ))}
                    </select>

                    <select onChange={e => handleFilterCreated(e)}>
                        <option value="All">Todos</option>
                        <option value="api">Videojuegos Existentes</option>
                        <option value="created">Videojuegos Creados</option>
                    </select>

                    <select onChange={e => handleOrderName(e)}>
                        <option value="">Orden</option>
                        <option value="asc">Ascendente</option>
                        <option value="des">Decendente</option>
                    </select>
                    <select onChange={(e) => { handleOrderRating(e) }}>
                        <option> Rating </option>
                        <option value="max">Max Rating</option>
                        <option value="min">Min Rating</option>
                    </select>
                </div>


                <div className="block2">
                    <Link to="/videogame"><button className="btn-2" >  Crear Juego </button></Link>

                </div>
            </div>

            <div className="busqueda">
                <SearchBar />


            </div>

            <div className="cards">
                {
                    currentGames?.map(f => {

                        return (
                            <div key={f.id}>
                                <Link to={`/videogames/${f.id} `} className="link">
                                    <Card
                                        name={f.name}
                                        image={f.image ? f.image : 'https://images.pexels.com/photos/245252/pexels-photo-245252.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'}
                                        generos={f.createdinDb ? f.generos.map((el) => el.name).join(' ') : f.generos.join(' - ')}
                                    />
                                </Link>
                            </div>
                        )
                    })
                }
            </div>

            <Paginado className="paginado"
                gamePerPage={gamePerPage}
                allVideogames={allVideogames.length}
                paginado={paginado}
            />

        </div>
    )

}
export default Home;