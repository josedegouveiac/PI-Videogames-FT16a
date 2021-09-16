import React from "react";
import { Link } from "react-router-dom"
import "./landing.css"

function Landing() {
    return (
        <div className="bg">
            <div className="container">

                <h1 className="title">TopGames</h1>
                <div>
                    <Link to="/home">
                        <button className="landing-btn">HOME</button>
                    </Link>
                </div>

            </div>

        </div>
    )
}

export default Landing;