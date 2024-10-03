import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
    const notesInitial = [
        {
          "_id": "66fabf169186ac7ef4842cae",
          "user": "66f96f000948d76e943cd8bf",
          "title": "My title",
          "description": "Description goes here",
          "tag": "personal",
          "date": "2024-09-30T15:09:10.233Z",
          "__v": 0
        },
        {
          "_id": "66fabfac4401be0fe45cc777",
          "user": "66f96f000948d76e943cd8bf",
          "title": "My title",
          "description": "Description goes here",
          "tag": "personal",
          "date": "2024-09-30T15:11:40.807Z",
          "__v": 0
        },
        {
          "_id": "66face37c43ba1ca15910787",
          "user": "66f96f000948d76e943cd8bf",
          "title": "My title",
          "description": "Description goes here",
          "tag": "personal",
          "date": "2024-09-30T16:13:44.002Z",
          "__v": 0
        }
      ]
      const [notes,setNotes] = useState(notesInitial); 
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;