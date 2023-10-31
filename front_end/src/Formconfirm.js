import React from "react";
import { useState } from "react";
import "./App.css";
import ReactDOM from "react-dom";
import App from "./App";
import axios from 'axios';
import PostComp from './BackEndComponents/PostComp.js';
import './css_Files/TodoList.css';
import 'w3-css/w3.css';

// component qui affiche le formulaire de confirmation de changement de status de tache

const Formconfirm = (props) => {

  const handleSubmit = (e) => {

        let URL = `http://localhost:8080/api/tasks/${props.name}?status=${props.value}`;
        async function putData(url = '', data = {}) {
            const response = await axios.put(url, data);
        }
        putData(URL, props.value);

        
        ReactDOM.render(
          <App  projectN={props.projectN} />,
        document.getElementById('root')
      );
  };

  const handleAnnuler = (e) => {
      ReactDOM.render(
        <App  projectN={props.projectN} />,
      document.getElementById('root')
    );
    
  };

  return (
    <div className="alert">
    <label className= "closebtn" >Voulez vous confirmez le mouvement</label>
    <button className="buttonCo w3-button w3-block w3-teal" onClick={handleSubmit}>Confirm</button>
    <button className="buttonCo w3-button w3-block w3-teal" onClick={handleAnnuler}>Back</button>
    </div>
  );
};

export default Formconfirm;
