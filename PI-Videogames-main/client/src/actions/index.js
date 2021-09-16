import axios from "axios";
import { GET_GAMES, FILTER_GENRES, FILTER_CREATED, ORDER_NAME, ORDER_RATING, SEARCH_NAME, GET_GENRES, GET_DETAIL } from "./types";


export function getGames() {
    return async function (dispatch) {
        let ruta = await axios.get("http://localhost:3001/videogames", {

        });
        return dispatch({
            type: GET_GAMES,
            payload: ruta.data
        })
    }
}

export function searchName(name) {
    return async function (dispatch) {
        let obj = await axios.get("http://localhost:3001/videogames?name=" + name)

        return dispatch({
            type: SEARCH_NAME,
            payload: obj.data
        })
    }
}

export function filterGenres(payload) {
    return {
        type: FILTER_GENRES,
        payload
    }
}

export function filterCreated(payload) {
    return {
        type: FILTER_CREATED,
        payload
    }
}

export function filterName(payload) {
    return {
        type: ORDER_NAME,
        payload
    }
}

export function filterRating(payload) {
    return {
        type: ORDER_RATING,
        payload
    }
}

export function getGenres() {
    return async function (dispatch) {
        const info = await axios.get("http://localhost:3001/genres")

        return dispatch({
            type: GET_GENRES,
            payload: info.data

        })

    }
}

export function postVideogames(payload) {
    return async function () {
        const res = await axios.post('http://localhost:3001/videogames', payload);

        return res


    }
}

export function getDetail(id) {
    return async function (dispacth) {
        let json = await axios.get(`http://localhost:3001/videogames/${id}`)
        return dispacth({
            type: GET_DETAIL,
            payload: json.data
        })
    }
}