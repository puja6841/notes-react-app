import React, { Component } from 'react';

class NoteCard extends Component {
  

  render() {
    const { note, getNote, deleteNote } = this.props;
    return(
      <div className="note-card-container">
        <div className="note-card-title">
          {note.title}
        </div>
        <div className="note-card-content">
          {note.description}
        </div>
      
        <span className="note-card-delete" onClick={() => deleteNote(note.id)}>
          <i className="material-icons">close</i>
        </span>
        <div>
       
        </div>
        
        
        <span className="note-card-edit" onClick={() => getNote(note.id)}>
          <i className="material-icons">mode_edit</i>
        </span>
      </div>
    );
  }
}

export default NoteCard;