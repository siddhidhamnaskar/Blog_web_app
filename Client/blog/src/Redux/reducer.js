import {GETDATA} from "./actionsTypes"

let initstate={
    data:[],
    image:""
}

const reducer=(state=initstate,{type,payload})=>{
      if(type===GETDATA)
      {
        return {
            ...state,
            data:[...payload]
        }
      }
      else if(type===Image){
        return {
            ...state,
            image:payload
        }
      }
}

export {reducer}