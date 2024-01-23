export function getUserName(state) {
    return state.profile.name
}

export function selectAuth(state) {
    return state.profile.isAuth
}