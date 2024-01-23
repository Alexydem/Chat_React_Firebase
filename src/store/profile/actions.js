import { auth } from '../../services/firabase'
import * as types from '../profile/types'

export const changeName = (name) => {
    return {
        type: types.CHANGE_NAME, payload: name
    }
}

export const isAuth = (isAuth) => {
    return {
        type: types.IS_AUTH, payload: isAuth
    }
}






//тут работает миддлвар, звено между диспатчем     и     экшном  -  асинхронная функция
// export const fetchUser = () => async (dispatch) => {
//     dispatch({ type: types.GET_USER });

//     try {
//         const user = await new Promise((resolve, reject) => {
//             auth.onAuthStateChanged((user) => {
//                 if (user) {
//                     console.log('ИЗ СТОРА, ПОЛЬЗОВАТЕЛЬ-', user.displayName);
//                     resolve(user);
//                 } else {
//                     reject(new Error('Failed USER'));
//                 }
//             });
//         });

//         dispatch({ type: types.GET_USER_SUCCESS, payload: user });
//     } catch (error) {
//         dispatch({ type: types.GET_USER_FAILURE, payload: error.message });
//     }
// };