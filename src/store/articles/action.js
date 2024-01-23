import * as types from './types';


//тут работает миддлвар, звено между диспатчем     и     экшном  -  асинхронная функция
export const fetchArticles = (api) => async (dispatch) => {
    dispatch({ type: types.FETCH_ARTICLES_START });

    try {
        const res = await fetch(api);
        if (res.ok) {
            const data = await res.json()
            dispatch({ type: types.FETCH_ARTICLES_SUCCESS, payload: data.results })
        } else {
            throw new Error('Failed to fetch articles');
        }
    } catch (error) {
        dispatch({ type: types.FETCH_ARTICLES_FAILURE, payload: error.message })

    }
}

export const deleteArticles = () => {
    return {
        type: types.CLEAR_ARTICLES
    }
}



export const setLoading = (isLoading) => {
    return {
        type: types.SET_LOADING,
        payload: isLoading
    }
}