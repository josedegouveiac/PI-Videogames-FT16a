import React from "react";
import { useState } from "react"
import { useDispatch } from "react-redux"
import { searchName } from "../actions";
import "./searchbar.css"


function SearchBar() {
    const dispatch = useDispatch()
    const [name, setName] = useState(" ")

    function handleInputName(e) {
        e.preventDefault()
        setName(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault()
        dispatch(searchName(name))
    }

    return (
        <div className="box">
            <input className="search input" type="text"
                placeholder="Escribir nombre"
                onChange={e => handleInputName(e)}
            />
            <button className="btn-buscar search" onClick={e => handleSubmit(e)} type="submit">Buscar</button>
        </div>
    )

}
export default SearchBar;