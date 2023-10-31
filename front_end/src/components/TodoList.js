import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import Appform from '../Appform';
import GetComp from '../BackEndComponents/GetComp';
import axios from 'axios';
import '../css_Files/TodoList.css';


// component qui affiche les projets d'un projet en redirigeant vers le component BackEnd qui recupére les données d l'api
function TodoList(props) {
  const [todos, setTodos] = useState([]);
  const [number, setNumber] = useState([]);
  const [searchBis, setSearchBis] = useState("");

  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    
    ReactDOM.render(
      <React.StrictMode>
        <Appform />
      </React.StrictMode>,
      document.getElementById('root')
    );
  };

  useEffect (() => {
    setSearchBis(props.search);
  }, [props.search]);



    // method getToken pour recupérer le token de l'utilisateur
    const getToken = () => {
      const token = sessionStorage.getItem('token');
      return JSON.parse(token);
   }
   // avoir le projet de l'utilisateur connecté
   const getProjects = (project,email) => {
    const emails = project.users.map(user => user.email);
    return emails.includes(email);
  }

  // avoir le nombre de projet total en utilise useffect
  useEffect(() => {
    axios.get('http://localhost:8080/api/projects/').then(res => {
      setNumber(res.data.filter(project => getProjects(project,getToken().email)).length);
    });
    
  }, []);



  




  return (
    <>
        <div className="w3-row" style={{marginBottom:" 24px"}}>
          <div className="w3-third w3-container ">
            <h1 style={{fontSize:"32px"}} >{props.name}</h1>
          </div>
          <div className="w3-third w3-container ">
            <p className ="todo-numberP" style={{fontSize:"32px"}} >{number}</p>
          </div>
          <div className='buttonlist w3-third w3-container'>
             <button className="todo-button" onClick={() => addTodo({ text: 'New Todo' })}>Add Project</button>
          </div>
        </div>
      


      <GetComp search={searchBis} />
    </>
  );
}

export default TodoList;
