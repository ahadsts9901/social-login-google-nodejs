export const reducer = (state, action) => {

    switch (action.type) {
        case "USER_LOGIN": {
            return { ...state, user: action.payload, isLogin: true }
        }
        case "USER_LOGOUT": {
            return { ...state, user: {}, isLogin: false }
        }
        case "CHANGE_THEME": {
            return { ...state, darkTheme: !state.darkTheme }
        }
        default: {
            return state
        }
    }
}