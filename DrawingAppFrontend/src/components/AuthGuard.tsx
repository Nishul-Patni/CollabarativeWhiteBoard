import React, { useContext, useEffect, useState } from 'react';
import { UserContext, UserContextPropsObject } from './Context/UserContext';

interface AuthGuardProps {
  Component: React.ComponentType;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ Component }) => {

    let [loading, setLoading] = useState<boolean>(true);
    let {user, setUser, setAuthToken} = useContext(UserContext) as UserContextPropsObject;

    useEffect(() => {
        const verify = async ()=>{
            const authToken = localStorage.getItem("token");
            // console.log(token);
            
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + authToken);
            
            let response = await fetch("http://localhost:3000/verifyToken", {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            })
            let result = await response.json();
            console.log(result);
            if(result.status == false){
                window.location.href = "http://localhost:5173/auth";
            }else{
                setUser(result.user);
                setLoading(false)
            }
        }
        
        verify();

    }, [])
    


  return (
    <>
    {
        loading==false ? <Component /> : ""
    }
    </>
  );
};

export default AuthGuard;