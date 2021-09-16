import React from "react";
import "./paginado.css"

function Paginado({ gamePerPage, allVideogames, paginado }) {
    const pageNumber = []

    for (let i = 1; i <= Math.ceil(allVideogames / gamePerPage); i++) {
        pageNumber.push(i)
    }


    return (
        <ul className="paginado">
            {
                pageNumber && pageNumber.map(Number => (
                    <li key={Number}>
                        <button className="number" onClick={() => paginado(Number)}>{Number}</button>
                    </li>
                ))
            }
        </ul>
    )
}

export default Paginado;