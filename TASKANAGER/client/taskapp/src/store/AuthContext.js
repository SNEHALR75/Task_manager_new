import { useState, createContext } from 'react'


export const AuthContext = createContext({
    user: {},
    setUser: () => { },
    accessToken: null,
    csrftoken: null,
    setAccessToken: () => { },
    setCSRFToken: () => { },
    loggedIn: null,
    setLoggedIn: () => { },
})

export function AuthContextProvider(props) {

    const [user, setUser] = useState({
        id:null,
        username:null,
        role:null,
        
        is_superuser:false,
        is_staff:false,
        is_active:false,
        
        profile_pic:null,
        first_name:null,
        last_name:null,
        email:null,
        gender:null,
        address:null,
        pincode:null,
        city:null,
        contact:null,
        company:null,
    })
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [csrftoken, setCSRFToken] = useState()
    const [loggedIn, setLoggedIn] = useState(false)

    return <AuthContext.Provider value={{
        user, setUser,
        accessToken, setAccessToken,
        refreshToken, setRefreshToken,
        csrftoken, setCSRFToken,
        loggedIn, setLoggedIn
    }}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext


