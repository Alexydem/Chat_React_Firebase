//это типа store хранилище
import * as types from './types'

const initialState = {
    user: {},
    userName: '',
    isAuth: false
}

export const profileReducer = (state = initialState, action) => {

    const { type, payload } = action

    switch (type) {
        case types.CHANGE_NAME:
            // console.log('имя должно поменяться на ', payload)
            return {
                ...state,
                name: payload
            }
        case types.IS_AUTH:
            return {
                ...state,
                isAuth: action.payload,
            }
        case types.GET_USER:
            console.log('ЗАПРОС ЮЗЕРА')
            return {
                ...state,
                user: action.payload,
            }
        case types.GET_USER_SUCCESS:
            console.log('ПОЛУЧЕНИЕ ЮЗЕРА')
            return {
                ...state,
                user: action.payload,
            }
        case types.GET_USER_FAILURE:
            console.log('ОШИБКА ЮЗЕРА')
            return {
                ...state,
                error: action.payload,
            }
        default:
            return state
    }

}