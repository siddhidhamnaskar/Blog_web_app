import { Paper } from "@mui/material";
import ResponsiveAppBar from "./AppBar";


export default function Details(){

   const paperStyle={
      width:"90%",
      height:"200vh",
      margin:"auto",
      marginTop:"30px",
      
     

   }


    return <>
    <ResponsiveAppBar/>
    <Paper elevation={20} style={paperStyle}>  
      <img></img>
      


    </Paper>

      

    </>
}