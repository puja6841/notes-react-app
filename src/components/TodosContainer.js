import React, { Component } from 'react'
import axios from 'axios'


class TodosContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
     tasktitle: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.createTodo = this.createTodo.bind(this);
	}

  //get the todo list
  getTodos() {
    axios.get('http://localhost:5000/todo/get')
    .then(response => {
      this.setState({todos: response.data})
    })
    .catch(error => console.log(error))
  }
  
  //create the todo
  createTodo = (e) => {
    if (e.key === 'Enter' && (e.target.value === '')) {
        alert("enter task");
    }
    else if (e.key === 'Enter' && !(e.target.value === '')) {
        e.preventDefault();
      axios.post('http://localhost:5000/todo/create', {tasktitle: e.target.value})
      .then(response => {
         this.getTodos();
         this.setState({
             tasktitle:''
         })
         })
      .catch(error => console.log(error))
    
     }    

  }

  handleChange = (e) => {
    this.setState({tasktitle: e.target.value});
  }



  

//delete the todo list
  deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/todo/${id}`)
    .then(response => {
    
        this.getTodos();
})

    .catch(error => console.log(error))
  }

  componentDidMount() {
    this.getTodos()
	}

  render() {
    return (
      <div>
        <div className="inputContainer">
          <input className="taskInput" type="text" 
            placeholder="Add a task" maxLength="50"
            onKeyPress={this.createTodo}
            value={this.state.tasktitle} onChange={this.handleChange} />
        </div> 


        <div className="listWrapper">
          <ul className="taskList">
            {this.state.todos.map((todo) => {
              return(
                <li className="task" key={todo.id}>
                  <input className="taskCheckbox" type="checkbox"
                    checked={todo.done}
                  
                     />              
                  <label className="taskLabel">{todo.tasktitle}</label>
                  <span className="deleteTaskBtn" 
                    onClick={(e) => this.deleteTodo(todo.id)}>
                    x Delete
                  </span>
                </li>
              )       
            })}        
          </ul>
        </div>
      </div>
    )
  }
}

export default TodosContainer
