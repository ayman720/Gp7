import { useState } from "react";
import "./app_log.css";
import FormInput from "./components/FormInput_log";
import reactDOM from "react-dom";
import App from "./App";
import Show from "./Show";
import React from "react";
import axios from "axios";

// component de formulaire d'inscription

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    // envoyer les valeur au formulaire get valeur
    reactDOM.render(<Show values={values} />, document.getElementById("root"));

    // send post request to add user
    async function postData(url = '', data = {}) {
      await axios.post(url, data);
    } 
   
    postData('http://localhost:8080/api/users', { name:values.username,email:values.email,password:values.password,role:"STUDENT"})    

  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // aller à la page d'inscription
  const goLogin = () => {
    reactDOM.render(<App loginn={false} />, document.getElementById("root"));
  };
  

  return (
    <div className="app">
       <div className="infoBloc" style={{display: "inline-block",color:"#ffffff",
                  textAlign: "center", fontDize: "25px"}}>
                   <img style={{width:"55%",    marginBottom: "10px"}} src={require('./images/task-list.png')} />
                   <p><b style={{    fontSize: "32px"}}>Task Manager</b><br></br>
                   Info Page kjerkjhezrjezkjr</p>
                   akehgjagejkgeagae 
                </div>
                <div clssName="loginBloc" style={{display: "inline-block",
                  marginLeft:" 10%"}}>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        {inputs.map((input) => (
          <FormInput  
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button className='buttoLogR' onclick={handleSubmit}>Submit</button>
        <button className='buttoLogR' onClick={goLogin}>login</button>
      </form>
      </div>
    </div>
  );
};

export default Register;
