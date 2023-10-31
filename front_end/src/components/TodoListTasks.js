import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import AppformTasks from '../AppformTasks';
import GetCompTasks from '../BackEndComponents/GetCompTasks';

// component qui affiche les tâches d'un projet en redirigeant vers le component BackEnd qui recupére les données d l'api
function TodoListTasks(props) {
  const [todos, setTodos] = useState([]);

  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    
    ReactDOM.render(
      <React.StrictMode>
        <AppformTasks projectN={props.projectName} />
      </React.StrictMode>,
      document.getElementById('root')
    );
  };



  function buttonn() {
    if (props.showb) {
      return (<button className="todo-button" onClick={() => addTodo({ text: 'New Todo' })}>Add Todo</button> );
    } else {
      return ;
    }
  }

  




  return (
    <>
        <div className="w3-row" style={{marginBottom:" 24px"}}>
          <div className="w3-twothird w3-container ">
            <h1 style={{fontSize:"32px"}} >{props.name}</h1>
          </div>
          <div className='buttonlist w3-third w3-container'>
              {buttonn()}
          </div>
        </div>
      
      <GetCompTasks projectN={props.projectName} status={props.status} />
    </>
  );
}

export default TodoListTasks;
