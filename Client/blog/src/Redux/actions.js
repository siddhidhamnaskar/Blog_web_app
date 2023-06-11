

import {GETDATA} from "./actionsTypes"
import {IMAGE} from "./actionsTypes"

const getData=(payload)=>{
    return{
        type:GETDATA,
        payload
    }
}

const saveImage=(payload)=>{
    return {
        type:IMAGE,
        payload

    }
}

export {getData,saveImage}