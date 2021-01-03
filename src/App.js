import React  from 'react';
import './App.css';

import './TodosContainer.css'
import '../src/Todo.css';
import Nav from './components/Nav';
import List from './components/List';
import Note from './components/Note';
import axios from 'axios';
import TodosContainer from './components/TodosContainer'

import Flash from './components/Flash';

class App extends React.Component {
  
  constructor() {
    super();
    this.state = {
      showNote: false,
      notes: [],
      note: {},
      newTag: false,
      error: '',

      showList: false,
      items: [],
      currentItem: {
        text: '',
        key: ''

      
    }
  };
    
  }

 

  toggleList = () =>{
    this.setState({
      showList: !this.state.showList,
      items:[]
    })
  }

  

  toggleNote = () => {
    this.setState({
      showNote: ! this.state.showNote,
      note: {}
    })
  }

  getNotes = () => {
    axios.get(`http://localhost:5000/note/get`)
    .then((res) => this.setState({notes: res.data}) )
    .catch((err) => console.log(err.response.data) );
  }

  getNote = (id) => {
    axios.get(`http://localhost:5000/note/${id}`)
    .then((res) => this.setState({note: res.data, showNote: true }) )
    .catch((err) => console.log(err.response.data) );
  }

  performSubmissionRequest = (data, id) => {
    if (id) {
      return axios.patch(`http://localhost:5000/note/${id}`, data);
    } else {
      return axios.post(`http://localhost:5000/note/create`, data);
    }
  }

  submitNote = (data, id) => {
    this.performSubmissionRequest(data, id)
    .then((res) => this.setState({ showNote: false }) )
    .catch((err) => {
     
    
      const { errors } = err.response.data;
      if (errors.description) {
         this.setState({ error: "Missing Note Content!" });
      } else if (errors.title) {
        this.setState({ error: "Missing Note Title!" });
      }
    });
  }


  deleteNote = (id) => {
    const newNotesState = this.state.notes.filter((note) => note.id !== id );
    axios.delete(`http://localhost:5000/note/${id}` )
    .then((res) => this.setState({ notes: newNotesState }) )
    .catch((err) => console.log(err.response.data) );
  }

  showTagForm = () => {
    this.setState({ newTag: true });
  }

  closeTagForm = () => {
    this.setState({ newTag: false });
  }
  
 

  resetError = () => {
    this.setState({ error: '' });
  }

  //To-Do-List Functions
  deleteItem = key => {
    const filteredItems = this.state.items.filter(item => {
      return item.key !== key
    })
    this.setState({
      items: filteredItems,
    })
  }

  handleInput = e => {
    const itemText = e.target.value
    const currentItem = { text: itemText, key: Date.now() }
    this.setState({
      currentItem,
    })
  }
  addItem = e => {
    e.preventDefault()
    const newItem = this.state.currentItem
    if (newItem.text !== '') {
      const items = [...this.state.items, newItem]
      this.setState({
        items: items,
        currentItem: { text: '', key: '' },
      })
    }
  }

  render() {
    const { showNote, showList,  notes, note, error } = this.state;
    
    

    return (
      <div className="App">
      
      
        <Nav toggleNote={this.toggleNote} showNote={showNote} toggleList={this.toggleList} showList={showList} />
        {error && <Flash error={error} resetError={this.resetError} />}
        <br />
        <br/>
       



        { showNote ? 
            <Note
              note={note}
             
              submitNote={this.submitNote}
              showTagForm={this.showTagForm}
              closeTagForm={this.closeTagForm}
            
            />
            :
            <List 
              getNotes={this.getNotes}
              notes={notes}
              getNote={this.getNote}
              deleteNote={this.deleteNote}
            /> 
        }
           
           { showList ?
            <div className="container">
        <div className="header">
          <h1>Todo List</h1>
        </div>
        <TodosContainer />
      </div>
          :
            <h1 class="welcome"><center></center></h1>
           }
       
     
      </div>
    );
  }
}

export default App;
