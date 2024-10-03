import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
    const s1 = {
        "name": "Vikas",
        "class": "BE",
    }
    const [state,  setState] = useState(s1);
    const update = ()=>{
        setTimeout(()=>{
            setState({
                "name":"Aarvik",
                "class":"ECE"
            })
        },3000);
    }
    return (
        <NoteContext.Provider value= {{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;