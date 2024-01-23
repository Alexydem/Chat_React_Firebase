import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import { addChat, changeChat, deleteChat } from '../../store/messages/action'
import { getDefaultChatId, getAllChats } from '../../store/messages/selectors'

import '../../../src/index.css';
import '../../../src/components/chatList/ChatList.css';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { NavLink } from 'react-router-dom';

import { push, set, remove } from "firebase/database"
import { chatsRef, getChatById } from "../../services/firabase";





export function ChatList({ chatsDB, chatsArray }) {

    // console.log('НА СТРАНИЦЕ ЧАТЛИСТ СЕЙЧАС', chatsDB, chatsArray)

    //переменная для отправки в роутинг
    const { id } = useParams();

    const dispatch = useDispatch()

    //дефолтный ID чата и его замена
    const defaultChat = useSelector(getDefaultChatId)
    // const defaultChat = chatsArray[0]

    // режим создания нового чата  
    const [isCreatingChat, setIsCreatingChat] = useState(false);
    //дефолтное имя нового чата
    const [newChatName, setNewChatName] = useState("");

    //вытаскиваю все чаты из стора в виде массива объектов
    // const chats = useSelector(getAllChats)

    //переношу список всех чатов из Апп через пропсы
    const chatsArr = chatsArray


    //перевод в режим создания нового чата
    const createNewChat = () => {
        setIsCreatingChat(!isCreatingChat)
        if (!isCreatingChat) {
            setNewChatName("");
        }
    }


    // СОХРАНЕНИЕ НОВОГО ЧАТА
    const saveNewChat = () => {
        // dispatch(addChat(newChat))
        set(chatsRef, {
            ...chatsDB,
            [newChatName]: {
                id: newChatName,
                name: newChatName
            }
        })
        //переключаемся на созданный чат
        dispatch(changeChat(newChatName))
        setIsCreatingChat(false)
        setNewChatName("")
    }




    //рендеринг формы создания нового чата
    const renderCreateChatForm = () => {
        return (
            <>
                <div className="createNewChatForm">
                    <input
                        className="newChatForm"
                        type="text"
                        placeholder="Название чата"
                        value={newChatName}
                        onChange={(e) => setNewChatName(e.target.value)}
                    />
                </div>
                <button
                    className="createNewChatButton"
                    onClick={saveNewChat}
                >CREATE
                </button>
            </>
        )
    }

    //выбор чата из списка по id
    const selectChat = (chatId) => {
        console.log('тыкнутый чат - chatId', chatId)
        if (chatId !== defaultChat) {
            dispatch(changeChat(chatId));
        }
    };


    // //удаление чата
    const removeChat = (chatId) => {
        // dispatch(deleteChat(chatId));
        console.log('chatId chatId chatId', chatId)
        remove(getChatById(chatId));

        // remove(chatsRef, `/${chatId}`);
    };



    // рендеринг списка чатов
    const chatList = chatsArr && chatsArr.map((chat) =>

        <NavLink
            to={`/chat/${chat.name}`} //пока сделал имя вместо ИД 
            className={chat.name === defaultChat ? "chatName activeChatName" : "chatName"}
            key={chat.name}
            onClick={() => selectChat(chat.name)}
        >
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemText primary={chat.name} />
                    <button
                        className="buttonDeleteChat"
                        onClick={() => removeChat(chat.name)}
                    >X</button>
                </ListItemButton>
            </ListItem>
        </NavLink>

    );

    return (
        <div className="chatsListBox">
            <button
                onClick={createNewChat}
                className="newChatButton"
            >{isCreatingChat ? "Отмена" : "Создать чат"}
            </button>
            <div className="chatsList">
                {isCreatingChat ?
                    renderCreateChatForm() :
                    chatList
                }
            </div>
        </div>

    );
}