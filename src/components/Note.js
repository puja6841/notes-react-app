import React, { Component } from 'react';


class Note extends Component {

 
 


  onSubmit(e) {
    e.preventDefault();
    const formData = {
      title: this.title.value,
      description: this.description.value
    };
    this.props.submitNote(formData, this.props.note.id);
  }

  render() {


    const { note, closeTagForm } = this.props;
    return(
      <div className="note-container">
       
        <form
          className="note-form"
          onSubmit={(e) => this.onSubmit(e)}
          onClick={() => closeTagForm()}
        >
          <div className="note-title">
            <input
            required
            
              className="note-title-input"
              type="text"
              placeholder="Note Title..."
              defaultValue={note.title}
              ref={(input) => this.title = input}
            />
          </div>

          <div className="note-textarea-container">
            <textarea
            required
             
              className="note-textarea"
              placeholder="Type Here..."
              defaultValue={note.description}
              ref={(input) => this.description = input}
            />
          </div>

         
          <input className="note-button" type="submit" value="Submit" />
        </form>
       
      </div>
    );
  }
}

export default Note;