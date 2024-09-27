import React, { createContext, useState } from "react";


export interface UserInterface{
    name : string, picture : string, email : string
}


export interface UserContextPropsObject{
    user : UserInterface | null;
    setUser : (u : UserInterface) => void;
    authToken : string | null;
    setAuthToken : (u : string | null) => void;
}

export const UserContext = createContext<UserContextPropsObject | null>(null);

export const UserContextProvider = (props) => {

    let [user, setUser] = useState<UserInterface | null>(null); 
    let [authToken, setAuthToken] = useState<null | string>(null);   

    return (
        <UserContext.Provider value={{user, setUser, authToken, setAuthToken}}>
            {props.children}
        </UserContext.Provider>
    )
}