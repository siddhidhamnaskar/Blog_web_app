
import { Route, Routes } from "react-router-dom";

import App from "../App";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
export default function Allroutes(){
    return <>
    <Routes>
        <Route path="/" element={<App/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>

    </Routes>
    </>
}