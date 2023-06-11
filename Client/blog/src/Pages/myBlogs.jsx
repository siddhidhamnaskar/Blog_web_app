import { base_url } from "../Sevices/API";
import { useState,useEffect,useContext } from "react";
import { UserContext } from "../Components/Usercontext";
import ResponsiveAppBar from "../Components/AppBar";
import MediaCard from "../Components/Card";
import CircularIndeterminate from "../Components/Loader";

export default function MyBlog(){
    const {userInfo,setUserInfo,image,setImage} =useContext(UserContext);
    const [data,setData]=useState([]);
    const [load,setLoad]=useState(false);

    useEffect(()=>{
        var token=localStorage.getItem('token')||"";

        fetch(`${base_url}/profile`,{
            method:"post",
            headers:{
              "Content-type":"application/json"
            },
            body:JSON.stringify({'token':token}),
         
       
           })
           .then((res)=>{
              res.json().then((info)=>{
                 
               setUserInfo(info);
               fetch(`${base_url}/myBlogs/?Author=${info.id}`)
               .then((res)=>{
                 return res.json();

                 })
                 .then((json)=>{
                    // console.log(json)
                   setData(json)
                 })
                })
           })
           
          

    },[])
    
    
    
    return <>
    <ResponsiveAppBar/>
  
  <h1 style={{textAlign:"center"}}>My Blogs</h1>
     
    {load ? <CircularIndeterminate/>:  <div id="blogcontainer">
     
   
     {data.map((elem)=>{
     
        return <MediaCard key={elem._id} {...elem}/>
        

     })}
       
         
   
  
   </div>}


    
    </>
}