//это типа store хранилище
import uuid from 'react-uuid'
import * as types from '../messages/types'

const initialState = {
    selectedChat: 1,
    chat: [
        {
            id: 1,
            name: 'Chat 1',
            messages: [
                { id: uuid(), author: "Петя", text: 'Потом на всю машину пахнет' },
                { id: uuid(), author: "Лепеха", text: 'чем?' },
                { id: uuid(), author: "Сюся", text: 'потом' },
                { id: uuid(), author: "Лахеру", text: 'Сейчас ответь!' },
            ],
        },
        {
            id: 2,
            name: 'Chat 2',
            messages: [
                { id: uuid(), author: "Сабинина Мама", text: 'Татиже Сабахъ' },
            ],
        },
        {
            id: 3,
            name: 'Chat 3',
            messages: [
            ],
        }
    ]
}

export const messagesReducer = (state = initialState, action) => {

    const { type, payload } = action

    switch (type) {
        case types.ADD_CHAT:
            return {
                ...state,
                chat: [...state.chat,
                {
                    id: payload.newChat.id,
                    name: payload.newChat.name,
                    messages: [],
                }
                ]
            }

        case types.DELETE_CHAT:
            return {
                ...state,
                chat: state.chat.filter(chat => chat.id !== payload.chatId)
            }
        case types.CHANGE_CHAT:
            return {
                ...state,
                selectedChat: payload.chatId
            }
        case types.SEND_MESSAGE:
            return {
                ...state,
                chat: state.chat.map((chat) =>
                    chat.id === payload.chatId
                        ? {
                            ...chat,
                            messages: [
                                ...chat.messages,
                                { id: uuid(), author: payload.author, text: payload.text },
                            ],
                        }
                        : chat
                ),
            };

        default:
            return state
    }

}
