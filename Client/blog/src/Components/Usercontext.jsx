import { createContext, useState } from "react";


export const UserContext=createContext({});

export function UserContextProvider({children}){
      const [userInfo,setUserInfo]=useState({Email:"",Name:"",id:""});

      return (
        <UserContext.Provider value={{userInfo,setUserInfo}}>
        {children}
        </UserContext.Provider>
      );

}