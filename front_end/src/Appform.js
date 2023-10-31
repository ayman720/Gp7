import React from "react";
import { useState } from "react";
import "./App.css";
import ReactDOM from "react-dom";
import App from "./App";
import axios from 'axios';
import PostComp from './BackEndComponents/PostComp.js';
import './components/formInput.css';

 // component qui affiche le formulaire de création de projet

const Appform = () => {

  return (
    <div className="app">
      <PostComp />
    </div>
  );
};

export default Appform;
