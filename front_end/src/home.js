import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import ReactDOM from "react-dom";
import App from "./App";
import axios from 'axios';
import PostComp from './BackEndComponents/PostComp.js';
import backgroundd from './images/backg.png';
import Register from './Register';

// component qui affiche les information sur le site web
const Home = () => {

  let history = useNavigate();
 

  const goLogin = () => {
    history("/");
  };



  ReactDOM.render(
    <div style={{"backgroundColor":" #fff"}}>
        <div id='AppTopNav' style= {{"backgroundColor":"#3e3e3e", color:"white","height":"50px","position":"sticky","top":"0"}}>
                <div style={{"display":"inline-block","width":"77%","padding":"7px 9px","marginLeft":"38px"}}>
                <img src={require('./images/logo.png')} style={{width:"70px"}} />

                </div>

                <div style={{"marginRight":"auto","width":"300px","display":"inline-block","position":"absolute","top":"30%"}}>
                    <ul style={{"listStyleType":"none","display":"inline-block"}}>
                        <li style={{"listStyleType":"none","display":"inline-block"}}><a href="#desc">Home</a></li>
                        <li style={{"listStyleType":"none","display":"inline-block"}}><a href="#aboutUs">About us</a></li>
                        <li style={{"listStyleType":"none","display":"inline-block"}}><a href="/" onClick={goLogin}>Login / Register</a></li>
                    </ul>


            </div>

                

            </div>

        <div id="desc" style={{ "backgroundImage":`url(${backgroundd})`,  "height":"700px"}}>

        <div style={{"width":"50%","padding":"271px 125px","fontSize":"20px"}}>
            <b style={{fontSize: "36px"}}>Task Manager</b>
            <p> GP7 is an utility web application that helps with creating and organizing all your projects, while having a clear vision over all your upcoming assignments. Log in, create new projects, and associate tasks to it to define the milestones and subgoals of your project.</p>
        </div>

        </div>



        <div id ="aboutUs" style={{"width":"81%","margin":"0 auto","marginTop":"85px","textAlign":"center","marginBottom":"150px"}}>
            <div style={{"display":"inline-block","marginRight":"40px"}}>
                <img src={require('./images/badr.png')} style={{"width":"220px","marginBottom":"22px"}} />
                <br />
                <b>Badr BENFEDDOUL</b>
                <p>2ème année Sciences et Ingénierie du Logiciel </p>
                <p>badr.benfeddoul@etu.inp-n7.fr </p>
            </div>

            <div style={{"display":"inline-block","marginRight":"40px"}}>
                <img src={require('./images/aymane.png')} style={{"width":"220px","marginBottom":"22px"}} />
                <br />
                <b>Aymane Mounir</b>
                <p>2ème année Architecture, Systèmes et Réseaux</p>
                <p>aymane.mounir@etu.inp-n7.fr </p>
            </div>
            <div style={{"display":"inline-block","marginRight":"40px"}}>
                <img src={require('./images/mouad.png')} style={{"width":"220px","marginBottom":"22px"}} />
                <br />
                <b>Mouad Akli</b>
                <p>2ème année Sciences et Ingénierie du Logiciel </p>
                <p>mouad.akli@etu.inp-n7.fr </p>
            </div>
            <div style={{"display":"inline-block","marginRight":"40px"}}>
                <img src={require('./images/amine.png')} style={{"width":"220px","marginBottom":"22px"}} />
                <br />
                <b>Mohammed-Amine Jaafari</b>
                <p>2ème année Architecture, Systèmes et Réseaux</p>
                <p>mohammedamine.jaafari@etu.inp-n7.fr</p>
            </div>

        </div>

        <div style={{"fontSize":"25px","fontFamily":"DM Sans, sans-serif","margin":"70px auto","width":"70%","textAlign":"center"}}>


        <h2>Encadrants </h2>
        <p style={{"marginBottom":"20px"}}>Daniel HAGIMONT, professeur-chercheur IRIT-INPT <br />
            Boris Teabe, enseignant-chercheur IRIT-INPT</p>
        <h2>Technologies utilisées </h2>

        <img src={require('./images/tech.png')} style={{"marginBottom":"22px"}} />

        </div>

        <footer>
            <div style={{"backgroundColor":"#333130","height":"50px","position":"sticky","bottom":"0","color":"#fff"}}>
                <p style={{"textAlign":"center","paddingTop":"15px"}}>Copyright &copy; 2022 ENSEEIHT</p>
            </div>
        </footer>
    </div>,
    document.getElementById('root')
  );
 

  return (
    <div className="app">
          
    </div>
  );
};

export default Home;
