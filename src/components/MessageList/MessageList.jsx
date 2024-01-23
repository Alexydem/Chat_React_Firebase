import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from 'react-redux'
import { getDefaultChatId, getAllChats } from '../../store/messages/selectors'

import '../../../src/index.css';
import '../../../src/components/MessageList/MessageList.css';

import { remove, } from "firebase/database";
import { removeMessageFromChat, getChatById } from "../../services/firabase";

export function MessageList({ allMessages, userName }) {
  // console.log('КОМПОНЕНТ MESSAGE LIST - allMessages', allMessages)

  // const [onMessage, setOnMessage] = useState('')

  // Переменная состояния для отслеживания изменений allMessages
  const [messages, setMessages] = useState([]);
  const [messageId, setMessageId] = useState([]);
  // const [myUserName, setMyUserName] = useState(userName);

  const defaultChat = useSelector(getDefaultChatId)

  //useEffect для обработки изменений allMessages
  useEffect(() => {
    setMessages(allMessages)

  }, [allMessages]);




  //удаление сообщения
  const removeMessage = (messageId) => {
    // dispatch(deleteChat(chatId));
    // console.log('Должно удалиться сообщение с ID', messageId)
    // console.log('chatId', defaultChat)
    // console.log('getChatById(defaultChat)', getChatById(defaultChat))
    remove(removeMessageFromChat(defaultChat, messageId));
  };


  console.log('СООБЩЕНИЕ ОТПРАВЛЯЕТ МИСТЕР - ', userName)
  // рендеринг списка чатов
  const renderMessages = messages && messages.map((message) =>

    <div
      className={`authorName ${message.author === userName ? "myMessage" : "message"}`}
      key={message.id}>
      <div className="messageTop">
        <div className={`authorName ${message.author === userName ? "authorIsUser" : "anotherUser"}`} >{message.author}:</div>
        <div className="removeMessageBtn" onClick={() => removeMessage(message.id)}
        >&#10799;</div>
      </div>
      <div className={`authorName ${message.author === userName ? "authorIsUser messageText" : "anotherUser messageText"}`}>{message.text}</div>
      <div className="date" >{message.date}</div>

    </div>

  );


  return (
    <div
      className="messageBorder">
      {renderMessages}
    </div>
  );
}
