import { GET_GAMES, FILTER_GENRES, FILTER_CREATED, ORDER_NAME, ORDER_RATING, SEARCH_NAME, GET_GENRES, POST_GAME, GET_DETAIL } from "../actions/types";

const initialState = {
    videogames: [],
    allVideogames: [],
    genres: [],
    detail: []
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_GAMES:
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload

            }

        case SEARCH_NAME:
            return {
                ...state,
                videogames: action.payload
            }

        case FILTER_GENRES:
            const allvideogames = state.allVideogames
            const generosFiltered = action.payload === 'All' ? allvideogames : allvideogames.filter(el => el.generos.includes(action.payload))
            return {
                ...state,
                videogames: generosFiltered
            }

        case FILTER_CREATED:
            const createdFilter = action.payload === "created" ? state.allVideogames.filter(el => el.createdinDb) : state.allVideogames.filter(el => !el.createdinDb)
            return {
                ...state,
                videogames: createdFilter
            }

        case ORDER_NAME:
            const arrSort = action.payload === "asc" ? state.allVideogames.sort(function (a, b) {
                if (a.name > b.name)
                    return 1

                if (b.name > a.name)
                    return -1

                return 0;
            }) : state.allVideogames.sort(function (a, b) {

                if (a.name > b.name)
                    return -1

                if (b.name > a.name)
                    return 1

                return 0;
            })
            return {
                ...state,
                videogames: arrSort
            }
        case ORDER_RATING:
            let filtered = action.payload === 'max' ? state.allVideogames.sort((a, b) => {
                if (a.rating < b.rating) {
                    return 1
                }
                if (b.rating < a.rating) {
                    return -1
                } else {
                    return 0
                }
            }) :
                state.allVideogames.sort((a, b) => {
                    if (a.rating < b.rating) {
                        return -1
                    }
                    if (b.rating < a.rating) {
                        return 1
                    } else {
                        return 0
                    }
                });
            return {
                ...state,
                videogames: filtered
            };
        case POST_GAME:
            return {
                ...state
            }
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            }
        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload
            }


        default:
            return state
    }
}

export default reducer;