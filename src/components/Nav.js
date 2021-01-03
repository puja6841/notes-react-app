import React, { Component } from 'react';


class Nav extends Component {
  render() {
    const { toggleNote, showNote, toggleList, showList } = this.props;
    
    return (
      <div className="nav-container">
        <div className="nav-logo">NOTE-FLIX</div>
        <img src={require('./Logo.png')} className="App-logo" alt="logo" />
        <div className="nav-button" onClick={() => toggleNote()} >
          { showNote ? 'Cancel' :  '+ Note' }
        </div> 
        <div className = "nav-button"  onClick = {() => toggleList() }>

            { showList ? 'Cancel' :  '+ To Do ' }
        </div>

       
      </div>
    );
  }
}

export default Nav;