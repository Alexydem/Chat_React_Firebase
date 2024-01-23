import * as types from '../messages/types'

export const addChat = (newChat) => {
    return {
        type: types.ADD_CHAT,
        payload: { newChat }
    }
}

export const deleteChat = (chatId) => {
    return {
        type: types.DELETE_CHAT,
        payload: { chatId }
    }
}

export const changeChat = (chatId) => {
    return {
        type: types.CHANGE_CHAT,
        payload: { chatId }
    }
}

export const sendMessage = (chatId, author, text) => {
    return {
        type: types.SEND_MESSAGE,
        payload: { chatId, author, text }
    }
}


//тут работает миддлвар, звено между диспатчем     и     экшном  -  асинхронная функция
export const sendMessageWithApply = (chatId, author, text) => (dispatch) => {
    dispatch(
        sendMessage(chatId, author, text)
    );

    setTimeout(() => {
        console.log('сработал миддлвар', chatId, author, text)
        dispatch(sendMessage(chatId, 'Олег Тинькофф', `${author}, ты лучший!`));
    }, 1000);
}