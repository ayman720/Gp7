import React, { useState } from 'react';
import './App.css';
import TodoListTasks from './components/TodoListTasks';
import TodoList from './components/TodoList';
import reactDOM from 'react-dom';
import Show from './Show';
import Register from './Register';
import FormInput_log from './components/FormInput_log';
import { BiUserPin, BiUser, BiLogOut } from 'react-icons/bi';
import { BsSearch } from 'react-icons/bs';
import { MdEmail, MdWork } from 'react-icons/md';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './home';
import {BiHome} from 'react-icons/bi';

// component de la page principal si l'utilisateur est connecté il affiche les tâches et les projets
// si non il affiche vers le formulaire de connexion
function App(props) {
  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });
  const [search, setSearch] = useState("");

  const inputs = [
    {
      id: 5,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 6,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    // envoyer les valeur au formulaire get valeur
    reactDOM.render(<Show values={values} />, document.getElementById("root"));
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const goRegister = () => {
    reactDOM.render(<Register />, document.getElementById("root"));
  };
  const LogOut = () => {
    sessionStorage.removeItem('token');
    reactDOM.render(<App />, document.getElementById("root"));
  };
  var info = true;
  // show the users info
  const showUserInfo = () => {
    if (info) {
        const userInf = ( <div className="userdetails">
                              <div className="user"> <BiUser />  </div>
                              <div className="name divU"> <BiUserPin />&nbsp;&nbsp;&nbsp;&nbsp;{getToken().name}  </div>
                              <div className="email divU"> <MdEmail />&nbsp;&nbsp;&nbsp;&nbsp;{getToken().email} </div>
                              <div className="birthday divU"><MdWork />&nbsp;&nbsp;&nbsp;&nbsp;STUDENT </div>
                          </div> );
        info = false;
        reactDOM.render(userInf, document.getElementById('placeUserInfo'));
    } else {
        info = true;
        reactDOM.render(<div></div>, document.getElementById('placeUserInfo'));
    }
  };

  const handleCha = (e) => {
    setSearch(e.target.value);
  };

  // afficher le code d'erreur en cas de mauvaise saisie des informations
  const getError = (error) => {
    
    if (error === undefined) {
      return "";
    } else {
    return (
      <div className="alertUser alert-danger" role="alert">
        {error}
      </div>
    )
    }
  };

  // recuperer le token de l'utilisateur
  function getToken() {

    const tokenString = sessionStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken;

  }
  
  //fonction qui retour bloc div si logi = true et sinon retourne un formulaire
  const login = () => {
      if (getToken() == undefined || getToken().email === "" ) {
        sessionStorage.setItem("token", JSON.stringify({
          username: "",
          email: "",
          birthday: "",
          password: "",
          confirmPassword: "" })); 

          //return login page
          return  (
              <div className="app">
                  
                <div className="infoBloc" style={{display: "inline-block",color:"#ffffff",
                  textAlign: "center", fontDize: "25px"}}>
                   <img style={{width:"55%",    marginBottom: "10px"}} src={require('./images/task-list.png')} />
                   <p><b style={{    fontSize: "32px"}}>Task Manager</b><br></br>
                   The application that helps you manage your projects</p>
                </div>
                <div clssName="loginBloc" style={{display: "inline-block",
                  marginLeft:" 10%"}}>
                    <Router>
                    <div>
                      <nav>
                        <ul>
                          <li style={{"fontSize": "28px"}}>
                            <a style= {{
                            "padding":"5.5px 4.5px 4px 4px","borderRadius":"5px"} } href="/home"><BiHome /></a>
                          </li>
                        </ul>
                      </nav>
                      <Routes>
                            <Route exact path='/home' element={<Home/>}/>
                      </Routes>
                      </div>
                    </Router>

                <form onSubmit={handleSubmit}>
                  {getError(props.messageErreur)}
                  <h1 style={{"padding":"13px","color":"rgb(77, 1, 77)","textAlign":"center"}}>Login</h1>
                    {inputs.map((input) => (
                      <FormInput_log  
                        key={input.id}
                        {...input}
                        value={values[input.name]}
                        onChange={onChange}
                      />
                    ))}
                  <button className='buttoLogR' onClick={handleSubmit}>Submit</button>
                  <button className='buttoLogR' onClick={goRegister}>Register</button>
                </form>
                </div>
              </div>
              );

        } else {
          // return page user

          return (
          <div className="App">
            <div id='AppTopNav' style={{backgroundColor: "#3e3e3e",height: "69px",position: "sticky",top: "0"}}>
                <div  style={{    margin: "0 auto",width : "98%"}} >

                              <img style={{width:"5%"}} src={require('./images/logo.png')} />

                        <div style={{display: "inline-block",width:"83%",borderRadius: "0px"}}> 
                            <form style={{    margin: "0 auto",width:"54%",backgroundColor:"#3e3e3e"}} class="w3-container">

                              <div style={{display: "inline-block",width: "88%"}}>
                            <input onChange={handleCha} style={{borderRadius: "0px"}} className="w3-input" type="text" />
                            </div>
                            <div style={{display: "inline-block"}}>

                            <button className = "w3-btn w3-block" style= {{    
                          fontSize: "20px", paddingTop: "2px"}}  > <BsSearch /> </button>
                            </div>

                            </form>

                        </div>

                        <div style={{display: "inline-block",width:"8%"}}> 
                          <button className = "w3-btn w3-block w3-teal" style= {{    padding:" 7px 6px",
                          fontSize: "20px",marginTop:"13px",width:"76%", borderRadius: "5px" }} > 
                                  <p style={{display: "inline-block",marginRight: "4px"}} onClick={LogOut} >Log out</p> <BiLogOut /> </button>

                        </div>

                        <div style={{display: "inline-block",width:"3%"}}> 
                          <button className = "w3-btn w3-block w3-light-blue" style= {{    padding:" 6px 10px",
                                  fontSize: "23px", marginTop: "13px", width: "51px",borderRadius:" 50%"}} onClick={showUserInfo} > <BiUser /> </button>

                        </div>

                        <div id="placeUserInfo">
                        </div>


                </div>

                

            </div>
            <div className="w3-row">
              <div className="w3-quarter w3-container">
                  <div className='todo-app'>
                    <TodoList key="1" search={search} name="Projects" bool="true" />
                  </div>
                </div>
              <div id="todo" className="w3-quarter w3-container">
                <div className='todo-app'>
                  <TodoListTasks key="2" projectName={props.projectN} status="TODO" showb={true} name="TODO Tasks" bool="true" />
                </div>
              </div>
              <div id="ipro" className="w3-quarter w3-container">
                <div className='todo-app'>
                  <TodoListTasks key="3" projectName={props.projectN} status="IN_PROGRESS" showb={false} name="In Progress Tasks" bool="false" />
                </div>
              </div>
              <div id="do" className="w3-quarter w3-container">
                <div className='todo-app'>
                  <TodoListTasks key="4" projectName={props.projectN} status="DONE" showb={false} name="Finished Tasks" bool="false" />
                </div>
              </div>
            </div>

    </div>
      );
        
      }
  }
  return (
    login()
  );
}

export default App;
