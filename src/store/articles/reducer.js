//это типа store хранилище
import * as types from '../articles/types'

const initialState = {
    articles: [],
    loading: false,
    error: ""
}

export const APIReducer = (state = initialState, action) => {

    const { type, payload } = action

    switch (type) {
        case types.FETCH_ARTICLES_START:
            console.log('СТАРТ из стора')
            return { ...state, loading: true, error: "" };
        case types.FETCH_ARTICLES_SUCCESS:
            console.log('ГОТОВО из стора', payload)
            return { ...state, loading: false, articles: payload };
        case types.FETCH_ARTICLES_FAILURE:
            console.log('ОШИБКА из стора')
            return { ...state, loading: false, error: payload };

        case types.CLEAR_ARTICLES:
            console.log('CLEAR_ARTICLES')
            return { ...state, articles: [] };

        case types.SET_LOADING:
            return { ...state, loading: payload };

        default:
            return state
    }

}
