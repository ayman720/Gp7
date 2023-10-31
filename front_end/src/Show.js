import { useEffect, useState } from "react";
import "./app_log.css";
import FormInput from "./components/FormInput_log";
import reactDOM from "react-dom";
import axios from "axios";
import React from "react";
import App from "./App";

// component qui teste si ll'utilisateur et dans la base de donnée si oui il crée un token session pour le garder connecter
// si non il est redirigé vers le formulaire de connexion

const Show = (props) => {
    const [logi, setLogi] = useState(false);
    const [usera, setUsera] = useState([]);
    
    // envoyer username et password au serveur pour vérifier si il est dans la base de donnée
    useEffect (() => {
            async function getData(url = '') {
                const response = await axios.get(url);
                return response.data;
            }

            async function getDataParam(url = '',data = {}) {
                const response = await axios.get(url,{params:data});
                return response.data;
            }
            setTimeout (() => {
                getDataParam(`http://localhost:8080/api/users`,{ mail: props.values.email, password: props.values.password } ).then(res => {
                    
                    setLogi(res);
                });
                getData(`http://localhost:8080/api/users/all?email=${props.values.email}`).then(res => {
                    
                    setUsera(res[0]);
                });
            }, 200);

            
            
    }, []);
    
    
    if (logi == true) {
        
        
        // creation du token session pour garder le user connecter
        sessionStorage.setItem('token', JSON.stringify(usera));
            return (
                <App />
            );
        
    } else { 
            // retourne le formulaire de connexion avec message d'erreur
            return (
                <App messageErreur="Email ou mot de passe incorrect"/>
            );
        
    } 


  };
  
  export default Show;
  