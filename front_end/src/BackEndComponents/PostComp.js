
import '../App.css';
import App from '../App';
import ReactDOM from 'react-dom';
import '../components/formInput.css'
import React, {Component} from 'react'
import axios from 'axios'
import 'w3-css/w3.css';
import '../components/formInput.css'


// component qui communique avec les api surtout pour envoyer les projets
export default class PostComp extends Component {
    
  state = {
    name: '',
    description: '',
  }

  handleChange = event => {
      let project = this.state;
      project[event.target.name] = event.target.value;
    this.setState({ project });
  }

  getToken = () => {
    // avoir le token de l'utilisateur connecté
    return JSON.parse(sessionStorage.getItem('token'));
  }


  handleSubmit = event => {
    event.preventDefault();
    async function postData(url = '', data = {}) {
      await axios.post(url, data);
    } 
   
      postData(`http://localhost:8080/api/projects?email=${this.getToken().email}`, { name:this.state.name,description:this.state.description}).catch(error => {
        
      });  
      


      ReactDOM.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>,
        document.getElementById('root')
      );
    
  }
  // retour à la page précedente
  handlClick = () => {
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root')
    );
  }


  render() {
    return (
      
    
        <form onSubmit={this.handleSubmit}>
        <h1 className="h1_form" style={{color:"#000"}}>Project</h1>
          <label ><b>Project Name</b></label>
            <input  className="formInput" 
                        type="text" name="name" value={this.state.name} onChange={this.handleChange.bind(this)} />
            <label ><b>Project Description</b></label>            
            
            <input className="formInput_desc" 
                        type="text" name="description" value={this.state.description} onChange={this.handleChange.bind(this)} />
          
          <button style={{width: "100%",marginTop: "8px"}} className="todo-button"  type="submit">Add</button>
          <button style={{width: "100%",marginTop: "8px"}} className="todo-button" onClick={this.handlClick}  type="submit">Back</button>
        </form>
    

        
  
    )
  }
}