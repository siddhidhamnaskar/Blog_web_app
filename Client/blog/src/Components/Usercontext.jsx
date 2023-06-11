import { createContext, useState } from "react";


export const UserContext=createContext({});

export function UserContextProvider({children}){
      const [userInfo,setUserInfo]=useState({Email:"",Name:"",id:""});
      const [image,setImage]=useState()

      return (
        <UserContext.Provider value={{userInfo,setUserInfo,image,setImage}}>
        {children}
        </UserContext.Provider>
      );

}