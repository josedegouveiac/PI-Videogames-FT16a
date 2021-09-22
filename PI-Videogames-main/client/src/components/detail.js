import React from "react"
import { Link } from "react-router-dom"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { HiArrowNarrowRight, HiArrowLeft } from "react-icons/hi";
import "./detail.css"

export default function Detail(props) {
    const dispacth = useDispatch();

    let detailGame = useSelector((state) => state.detail)
    console.log(detailGame)

    useEffect(() => {
        dispacth(getDetail(props.match.params.id))
    }, [dispacth, props.match.params.id])




    return (
        <div className="fondo">
            {detailGame.length > 0 ?
                <div>
                    <h1 className="nombre">{detailGame[0].name}</h1>
                    <div className="cajas">

                        <div className="caja-img">
                            <img className="img" src={detailGame[0].image} alt="not Found" />
                        </div>

                        <div className="caja-des">

                            <h4 className="descripcion"> {detailGame[0].description}</h4>
                            <h4 className="lanzamiento">Lanzamiento <HiArrowNarrowRight className="arrow" />
                                {detailGame[0].released}
                            </h4>
                            <h4 className="rating">Rating <HiArrowNarrowRight className="arrow" />
                                {detailGame[0].rating}
                            </h4>

                            <h4 className="platforms">Platformas <HiArrowNarrowRight className="arrow" /> {detailGame[0].createdinDb === true ? detailGame[0].platforms : detailGame[0].platforms.map(el => el)}</h4>
                            <h4 className="genres">Generos <HiArrowNarrowRight className="arrow" />  {!detailGame[0].createdinDb ?
                                detailGame[0].generos + ' ' :
                                detailGame[0].generos.map(el => el.name).join(' - ')}
                            </h4>


                        </div>
                    </div>


                    <Link to="/home"> <button className="btn-detail"><HiArrowLeft className="arrow-left" /></button></Link>


                </div> : <p className="preloader">Loading...</p>

            }

        </div>
    )
}
