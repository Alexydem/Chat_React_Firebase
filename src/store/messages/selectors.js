export function getUserName(state) {
    return state.profile.name
}

export function getDefaultChatId(state) {
    return state.chats.selectedChat
}

export function getAllChats(state) {
    return state.chats.chat
}
