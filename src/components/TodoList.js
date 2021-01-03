import React, { Component } from 'react'
//import TodoItems from './TodoItems';



class TodoList extends Component {
  createTasks = item => {
    return (
      <li key={item.key} onClick={() => this.props.deleteItem(item.key)}>
        {item.text}
      </li>
    )
  }

    
    componentDidUpdate() {
      this.refs.textInput.focus()
    }
    render() {
      const todoEntries = this.props.entries
      const listItems = todoEntries.map(this.createTasks)

      
      return (
        <div className="todoListMain">
          <div className="header">

          <div className="note-title">
            <input
              className="note-title-input"
              type="text"
              placeholder="Todo Title..."
           
            />
          </div> 

            <form onSubmit={this.props.addItem}>
              <input

                placeholder="Task"
                type="text"
                ref="textInput"
                value={this.props.currentItem.text}
                onChange={this.props.handleInput}
              />
              <button type="submit"> Add Task </button>
            </form>
          
          </div>
          <ul className="theList">{listItems}</ul>

          <input className="note-button" type="submit" value="Save" />
          
        </div>
      )
    }
  }

export default TodoList;