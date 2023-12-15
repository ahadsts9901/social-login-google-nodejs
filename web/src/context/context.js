import React, { createContext, useReducer } from "react"
import { reducer } from "./reducer";
export const GlobalContext = createContext("Initial Value");
let data = {
    user: {}, // { firstName: "John", lastName: "Doe", email: "XXXXXXXXXXXXXX" }
    isLogin: null, // null || true || false
    isAdmin: null, // null || true || false
    darkTheme: localStorage.getItem("weAppDarkTheme") || false
}
export default function ContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, data)
    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    )
}