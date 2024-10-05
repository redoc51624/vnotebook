import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);

  //Get all notes
  const getNotes = async () => {
    //API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZmOTZmMDAwOTQ4ZDc2ZTk0M2NkOGJmIn0sImlhdCI6MTcyNzg5MDAwM30.duZKDk6A9rarsvExOoOjfdHj6KkJ_8GxDqZZ-cV5TfU"
      }
    });
    const json = await response.json();
    setNotes(json);
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZmOTZmMDAwOTQ4ZDc2ZTk0M2NkOGJmIn0sImlhdCI6MTcyNzcwNzA2N30.-UoZPgMeMURHCx7QGvTH9P_v3LjPJVy4oJBxfNMXL5I"
      },
      body: JSON.stringify({ title, description, tag })
    });

    const note = await response.json();
    setNotes(notes.concat(note))
  }
  //Delete a note
  const deleteNote = async (id) => {
    //API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZmOTZmMDAwOTQ4ZDc2ZTk0M2NkOGJmIn0sImlhdCI6MTcyNzg5MDAwM30.duZKDk6A9rarsvExOoOjfdHj6KkJ_8GxDqZZ-cV5TfU"
      }
    });
    const json = response.json();
    console.log(json);
    console.log("Deleteing the note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }
  //Edit a note
  const editNote = async (id, title, description, tag) => {

    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZmOTZmMDAwOTQ4ZDc2ZTk0M2NkOGJmIn0sImlhdCI6MTcyNzg5MDAwM30.duZKDk6A9rarsvExOoOjfdHj6KkJ_8GxDqZZ-cV5TfU"
      },
      body: JSON.stringify(title, description, tag)
    });
    const json = response.json();

    //Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }

  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;