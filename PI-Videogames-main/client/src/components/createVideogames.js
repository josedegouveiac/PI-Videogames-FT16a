import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { postVideogames, getGenres } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import "./created.css"

export function CreateVideogames() {
    const dispatch = useDispatch();
    const history = useHistory();
    const generos = useSelector((state) => state.genres)

    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: "",
        description: "",
        released: "",
        image: "",
        rating: "",
        platforms: [],
        generos: []
    });

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch]);

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));

    }
    function handleselect(e) {
        setInput({
            ...input,
            generos: [...input.generos, e.target.value]
        })
    }


    function handleSubmit(e) {
        e.preventDefault()
        dispatch(postVideogames(input))
        alert("Videojuego Creado")
        setInput({
            name: "",
            description: "",
            released: "",
            image: "",
            rating: "",
            platforms: [],
            generos: [],
        })
        history.push("/home")
    }

    function validate(input) {
        let errors = {}
        if (!input.name) {
            errors.name = "Campo Obligatorio"
        } if (!input.description) {
            errors.description = "Campo Obligatorio"
        } if (!input.released) {
            errors.released = "Campo Obligatorio"
        } if (!input.rating) {
            errors.rating = "Campo Obligatorio"
        } if (!input.platforms.length === 0) {
            errors.platforms = "Campo Obligatorio"
        } else {
            return errors;
        }
    };




    return (
        <div className="top">
            <form className="form" onSubmit={(e) => handleSubmit(e)}>
                <h1 className="title-create">Crea un Videojuego</h1>
                <div className="cont">
                    <input className="controls"
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={(e) => { handleChange(e) }}
                        placeholder="Name"
                    />
                    {errors.name && (
                        <p className="error" >{errors.name}</p>
                    )}

                </div>
                <div className="cont">
                    <input className="controls"
                        type="text"
                        value={input.description}
                        name="description"
                        onChange={(e) => handleChange(e)}
                        placeholder="Description"


                    />
                    {errors.description && (
                        <p className="error" >{errors.description}</p>
                    )}
                </div>
                <div className="cont">
                    <input className="controls"
                        type="date"
                        value={input.released}
                        name="released"
                        onChange={(e) => handleChange(e)}
                        placeholder="Released"


                    />
                    {errors.released && (
                        <p className="error" >{errors.released}</p>
                    )}
                </div>
                <div className="cont">
                    <input className="controls"
                        type="text"
                        value={input.image}
                        name="image"
                        onChange={(e) => handleChange(e)}
                        placeholder="Image"


                    />
                </div>
                <div className="cont">
                    <input className="controls"
                        type="number"
                        value={input.rating}
                        name="rating"
                        onChange={(e) => handleChange(e)}
                        placeholder="Raiting"

                    />
                    {errors.rating && (
                        <p className="error" >{errors.rating}</p>
                    )}
                </div>
                <div className="cont">
                    <input className="controls"
                        type="text"
                        value={input.platforms}
                        name="platforms"
                        onChange={(e) => handleChange(e)}
                        placeholder="Platforms"
                    />



                </div>
                <select onChange={(e) => handleselect(e)}>
                    {generos.map((f, i) => (

                        <option key={i} value={f.name}>{f.name}</option>

                    ))}
                </select>


                <div className="btn-form">
                    <button className="btn-one" type="submit" > Crear Videojuego</button>
                    <Link to="/home"><button className="btn-one two">Volver</button></Link>
                </div>


            </form>
            <ul className="render">
                {input.generos.map((el, i) =>
                    <div key={i}>
                        <li>{el}</li>
                    </div>
                )}

            </ul>
        </div >
    )



}