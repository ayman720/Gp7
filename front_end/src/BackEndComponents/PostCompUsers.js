
import '../App.css';
import App from '../App';
import ReactDOM from 'react-dom';
import '../components/formInput.css'
import React, {Component} from 'react'
import axios from 'axios'


// component qui communique avec les api surtout pour envoyer les users
export default class PostCompUsers extends Component {
    
  state = {
    tasks : {
      name: '',
      description: '',
      status: 'TODO',
      id : '' ,
      userid : '' ,
    },
    projects : [],
    users: [],
    val : true,
    
  }

  handleMouse = event => {
    
    // val pour savoir si on est dans un projet ou pas

    if(this.state.val === true && this.props.projectN !== undefined)
    {
      this.setState({val : false});
      this.state.tasks.id = this.state.projects.filter(value => value.name === this.props.projectN)[0].id;
      this.state.tasks.userid = this.state.users.filter(value => value.email === this.getToken().email)[0].id;
      
      

    }
    
    
  }

  handleSubmit = event => {
    
    
    event.preventDefault();
    

    let URL = `http://localhost:8080/api/projects/${this.state.tasks.id}/${this.state.tasks.userid}`;
    
    async function putData(url = '', data = {}) {
      const response = await axios.put(url);
    } 
   
    putData(URL)

    ReactDOM.render(
        <React.StrictMode>
          <App projectN={this.props.projectN} />
        </React.StrictMode>,
        document.getElementById('root')
      );
    
  }

  componentDidMount() {
    async function getData(url = '') {
      const response = await axios.get(url);
      return response.data;
    }
    getData('http://localhost:8080/api/projects')
    .then(data => {
      this.setState({projects: data});
    })

    getData('http://localhost:8080/api/users/all')
    .then(data => {
      this.setState({users: data});
      
      
    })

  }


  handlClick = () => {
    ReactDOM.render(
      <React.StrictMode>
        <App projectN={this.props.projectN} />
      </React.StrictMode>,
      document.getElementById('root')
    );
  }


  handleSelectStat = (e) => {
    // affecter this.state.task.id à l'id du projet selectionné
    this.setState({ tasks : {...this.state.tasks, status: e.target.value}} );

  }

  getToken = () => {
    // récupérer le token de l'utilisateur connecté
    return JSON.parse(sessionStorage.getItem('token'));
  }

  handleSelect = (e) => {
    // affecter this.state.task.id à l'id du projet selectionné
    
    this.setState({ tasks : {...this.state.tasks, id: e.target.value}});
    
    
  }

  handleSelectU = (e) => {
    // affecter this.state.task.id à l'id du projet selectionné
    
    
    
    this.setState({ tasks : {...this.state.tasks, userid: e.target.value}});
    
    
  }

  // afficher les utilisateurs qui sont dans le projet
  getProjectUsers = (userid) => {
    var userPro = this.props.users;
    
    

    const emails = userPro.map(user => user.id);
    
    
    
    return !(emails.includes(userid));
  }

  render() {
    return (
      
      <div className="appform" >
        <form className="form_form" style={{ marginLeft: "29%" ,marginTop: "15%" }} onSubmit={this.handleSubmit} onMouseEnter={this.handleMouse}>


            <label ><b>Users</b></label>
            <select id="monselect" style={{ width: "100%",padding: "10px",margin: "8px 0"}} className="container" value={this.state.tasks.userid} onChange={this.handleSelectU}>
              {this.state.users.filter( user => this.getProjectUsers(user.id) ).map(user =>
                <option className="select"   key={user.id} value={user.id} >{user.name}</option>
              )}
            </select>

          <button style={{width: "100%",marginTop: "8px"}} className="todo-button"  type="submit">Add</button>
          <button style={{width: "100%",marginTop: "8px"}} className="todo-button" onClick={this.handlClick}  type="submit">Back</button>
        </form>
      </div>

        
  
    )
  }
}