
import { Route, Routes } from "react-router-dom";

import App from "../App";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import CreatePost from "../Pages/CreatePost";
import Details from "../Pages/Details";
import EditPost from "../Pages/EditPost";
export default function Allroutes(){
    return <>
    <Routes>
        <Route path="/" element={<App/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/createpost" element={<CreatePost/>}></Route>
        <Route path="/details/:id" element={<Details/>}></Route>
        <Route path="/edit/:id" element={<EditPost/>}></Route>

    </Routes>
    </>
}