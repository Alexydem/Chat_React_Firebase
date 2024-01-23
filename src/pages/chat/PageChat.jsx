import { React } from "react";
import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { sendMessage, sendMessageWithApply } from '../../store/messages/action'
import { getUserName, getDefaultChatId, getAllChats } from '../../store/messages/selectors'
import { isAuth } from "../../store/profile/actions";
import { selectAuth } from "../../store/profile/selectors";

import { MessageList } from "../../components/MessageList/MessageList";
import { ChatList } from "../../components/chatList/ChatList";

import '../../../src/index.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/FilledInput';
import SendIcon from '@mui/icons-material/Send';
import ListItemText from '@mui/material/ListItemText';

import { auth } from "../../services/firabase";
import { push, remove } from "firebase/database"
import { getMessagesById } from "../../services/firabase";


export function PageChat({ chatsDB, chatsArray, userName }) {
    const dispatch = useDispatch()
    const messageInputRef = useRef(null);

    //id Нового сообщения
    // const [onMessage, setOnMessage] = useState('')


    //вытаскиваю все чаты из БД, получаю пропсами из Апп
    // const chatsArr = chatsArray

    const { chatId } = useParams();

    //фокус на поле ввода
    useEffect(() => {
        messageInputRef.current?.focus();
    }, []);

    //   id дефолтного чата из стора чатов
    ///////////////это надо переделать на самый первый чат из списка чатов в которых состоит юзер
    //
    //
    const selectedChatID = useSelector(getDefaultChatId)
    //
    //
    //
    //

    //автор сообщения из AUTH
    const author = auth.currentUser ? auth.currentUser.displayName : null;

    //вытаскиваю все чаты из стора в виде массива объектов
    const chats = useSelector(getAllChats)

    //массив сообщений чата
    const messageList = () => {
        const activeChat = chats.find(c => c.id === selectedChatID);
        return activeChat ? activeChat.messages : [];
    };

    // console.log('массив сообщений чата', messageList());

    //Рендеринг верстки из массива сообщений
    // let messages = messageList().map((message) =>
    //     <div className="message" key={message.id}>
    //         <div className={`authorName ${message.author === "Олег Тинькофф" ? "authorOleg" : ""}`} >{message.author}:</div>
    //         <div className="dialogLine" >{message.text}</div>
    //     </div>
    // );

    //новое сообщение
    const [newMessageText, setNewMessageText] = useState("");

    //отправка сообщения на кнопку Enter
    useEffect(() => {
        // Добавляем слушатель события при монтировании компонента
        window.addEventListener('keyup', handleKeyEnter);
        // Убираем слушатель события при размонтировании компонента
        return () => {
            window.removeEventListener('keyup', handleKeyEnter);
        };
    }, [newMessageText]);
    const handleKeyEnter = (event) => {
        if (event.code === 'Enter') {
            event.preventDefault();
            handleSendMessage();
        }
    };



    //тут принимает объект чатов, вычленяем по названию и переделываем в понятный массив
    const messagesChat = chatsArray.find((chat) => chat?.name === selectedChatID)
    const messagesArr = messagesChat ? Object.entries(messagesChat.messages || {}) : []
    const allMessages = messagesArr.map((message) => (
        {
            id: message[0],
            text: message[1].text,
            author: message[1].author,
            date: message[1].date,
        }

    ))



    //функция получения даты и времени     (возможно лучше разделить на дату и на время отдельно)
    const [currentDate, setCurrentDate] = useState('');
    function getCurrentDateTime() {
        const now = new Date();
        const day = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Месяцы начинаются с 0
        const year = now.getFullYear();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const formattedDateTime = `${day}.${month}.${year} ${hours}:${minutes}`;
        return formattedDateTime;
    }
    useEffect(() => {
        const currentDateTime = getCurrentDateTime();
        setCurrentDate(currentDateTime);
    }, []);




    //функция отправки сообщения              и ответ бота + стирание инпута   
    const handleSendMessage = () => {
        if (newMessageText !== "") {
            const currentDate = getCurrentDateTime(); // Обновляем дату перед отправкой
            // dispatch(sendMessageWithApply(selectedChatID, author, newMessageText, currentDate));
            const messageId = push(getMessagesById(selectedChatID), {
                author,
                text: newMessageText,
                date: currentDate
            }).key;
            // setOnMessage(messageId)
            console.log("messageId созданного сообщения", messageId)
        }
        setNewMessageText('');
    };


    // //удаление сообщения
    // const removeChat = (chatId) => {
    //     // dispatch(deleteChat(chatId));
    //     console.log('messageId messageId messageId', messageId)

    //     remove(getMessagesById(chatId, messageId));

    //     // remove(chatsRef, `/${chatId}`);
    // };












    return (
        <div className="chatBox">

            <ChatList
                chatsDB={chatsDB}
                chatsArray={chatsArray}
            />
            <div className="messagesBox">
                <MessageList
                    allMessages={allMessages}
                    userName={userName}
                />
                <div className="buttonPannel">
                    <TextField
                        inputRef={messageInputRef} //фокусировка на вводе сообщения
                        className="input"
                        // id="outlined-basic"
                        label="Outlined"
                        variant="outlined"
                        type="text"
                        autoComplete="off"
                        placeholder="Enter your message"
                        onChange={event => setNewMessageText(event.target.value)}
                        value={newMessageText} />
                    <Button
                        className="sendButton"
                        variant="contained"
                        endIcon={<SendIcon />}
                        onClick={handleSendMessage}>
                        SEND
                    </Button>
                </div>
            </div>

        </div>
    );
}