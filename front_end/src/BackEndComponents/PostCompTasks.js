
import '../App.css';
import App from '../App';
import ReactDOM from 'react-dom';
import '../components/formInput.css'
import React, {Component} from 'react'
import axios from 'axios'

// component qui communique avec les api surtout pour envoyer les tâches
export default class PostCompTasks extends Component {
    
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
    valuser : false,
  }

  handleChange = event => {
    
    // val pour savoir si on est dans un projet ou pas

    if(this.state.val === true && this.props.projectN !== undefined)
    {
      this.setState({val : false});
      this.state.tasks.id = this.state.projects.filter(value => value.name === this.props.projectN)[0].id;
      this.state.tasks.userid = this.state.users.filter(value => value.email === this.getToken().email)[0].id;

    }
    let tasksadd = this.state.tasks;
    tasksadd[event.target.name] = event.target.value;
    this.setState({...this.state, tasks : tasksadd });
    
    
  }

  handleSubmit = event => {
    
    
    event.preventDefault();

    let URL = `http://localhost:8080/api/tasks/${this.state.tasks.id}/${this.state.tasks.userid}`;
    
    async function postData(url = '', data = {}) {
      const response = await axios.post(url, data);
    } 
   
    postData(URL, { name:this.state.tasks.name,description:this.state.tasks.description,taskStatus:this.state.tasks.status,mark:"0"})

    ReactDOM.render(
        <React.StrictMode>
          <App projectN={this.props.projectN} />
        </React.StrictMode>,
        document.getElementById('root')
      );
    
  }
  
  getProjects = (project,email) => {
    const emails = project.users.map(user => user.email);
    return emails.includes(email);
  }
  componentDidMount() {
    async function getData(url = '') {
      const response = await axios.get(url);
      return response.data;
    }
    getData('http://localhost:8080/api/projects')
    .then(data => {
      this.setState({projects: data.filter( project => this.getProjects(project,this.getToken().email) )});
      if (this.props.projectN !== undefined && this.state.val === true) {
          this.setState({valuser : true});
          this.setState({users: data.filter(value => value.name === this.props.projectN)[0].users});
      } else 
      {
        this.setState({valuser : false});
      }
    })

    
    getData('http://localhost:8080/api/users/all')
    .then(data => {
      if ( this.state.valuser === false) {
        this.setState({users: data});
      }
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
    // avoir le token de l'utilisateur connecté
    return JSON.parse(sessionStorage.getItem('token'));
  }

  handleSelect = (e) => {
    // affecter this.state.task.id à l'id du projet selectionné
    
    this.setState({ tasks : {...this.state.tasks, id: e.target.value}});
    
    const nameP = this.state.projects.filter(value => value.id == e.target.value)[0].users;
    this.setState({ users : nameP });
    
  }

  handleSelectU = (e) => {
    // affecter this.state.task.id à l'id du projet selectionné
    
    
    
    this.setState({ tasks : {...this.state.tasks, userid: e.target.value}});
    
    
  }

  render() {
    return (
      
      <div className="appform" >
        <form className="form_form" onSubmit={this.handleSubmit}>
        <h1 className="h1_form" style={{color: "#000"}}>Tasks {this.props.projectN}</h1>
          <label ><b>task Name</b></label>
            <input onClick={this.handleCli}  className="formInput" 
                        type="text" name="name" value={this.state.tasks.name} onChange={this.handleChange.bind(this)} />
            <label ><b>task Description</b></label>
            
            <input className="formInput_desc" 
                        type="text" name="description" value={this.state.tasks.description} onChange={this.handleChange.bind(this)} />
            <label ><b>Status</b></label>
              <select id="monselect_status" style={{ width: "100%",padding: "10px",margin: "8px 0"}} className="container" value={this.state.tasks.status} onChange={this.handleSelectStat} >
                <option className="select" key= "1" value="TODO">TODO</option>
                <option className="select" key="2" value="IN_PROGRESS" >IN_PROGRESS</option>
                <option className="select" key="3" value="DONE" >DONE</option>
              </select>

            <label ><b>Project Id</b></label>
            <select id="monselect" style={{ width: "100%",padding: "10px",margin: "8px 0"}} className="container" value={this.state.tasks.id} onChange={this.handleSelect}>
              {this.state.projects.map(project =>
                <option className="select"   key={project.id} name={project.name} value={project.id} >{project.name}</option>
              )}
            </select>

            <label ><b>Users</b></label>
            <select id="monselect" style={{ width: "100%",padding: "10px",margin: "8px 0"}} className="container" value={this.state.tasks.userid} onChange={this.handleSelectU}>
              {this.state.users.map(user =>
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