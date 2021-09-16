import React from "react";
import "./card.css"

function Card({ name, image, generos }) {
    return (
        <div className="all">,
            <h3 className="name">{name}</h3>
            <h5 className="generos">{generos}</h5>
            <img className="image" src={image} alt="not found" />
        </div>

    )
}
export default Card;