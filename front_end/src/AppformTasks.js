import React from "react";
import { useState } from "react";
import "./App.css";
import ReactDOM from "react-dom";
import App from "./App";
import axios from 'axios';
import PostCompTasks from './BackEndComponents/PostCompTasks.js';
import './components/formInput.css';


// component qui affiche le formulaire de création de tâche
const AppformTasks = (props) => {


  return (
    <div className="app">
      <PostCompTasks projectN={props.projectN} />
    </div>
  );
};

export default AppformTasks;
