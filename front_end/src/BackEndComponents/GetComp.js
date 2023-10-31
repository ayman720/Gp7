
import '../App.css';
import React, {Component} from 'react'
import axios from 'axios'
import 'w3-css/w3.css';
import TodoListTasks from '../components/TodoListTasks';
import reactDOM from 'react-dom';
import PostCompUsers from './PostCompUsers';
import { useEffect } from 'react';
import { AiOutlineInfoCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { GoDiffRenamed } from 'react-icons/go';


// component qui communique avec les api surtout pour avoir les projets de l'utilisateur connecté
export default class GetComp extends Component {
  state = {
    projects: [],
    tasks : [],
    allvalues : [],
    showData : "",
  }

  componentDidMount() {
    async function getData(url = '') {
      const response = await axios.get(url);
      return response.data;
    }
    setTimeout(() => {
      getData('http://localhost:8080/api/projects').then(data => {
        this.setState({ projects: data });
        this.setState({ allvalues: data });
      });
    }, 200);
    setTimeout(() => {
      getData('http://localhost:8080/api/tasks').then(data => {
        this.setState({ tasks: data });
      });
    }, 200);
    

  }

  componentDidUpdate(nextProps) {
    // filtrer la liste des projets
    const keyword = this.props.search;
    const projects = this.state.allvalues.filter( project => this.getProjects(project,this.getToken().email) );
    if (this.props.search !== nextProps.search) {
      if (keyword !== '') {
        const results = projects.filter((user) => {
          return user.name.toLowerCase().includes(keyword.toLowerCase());
        });
        this.setState({ projects: results });
      } else {
        this.setState({ projects: projects });
      }
    }
    else {

    }


  }



  // showTasks : fonction qui affiche les taches d'un projet par rapport à son nom
  showTasks = (e) => {
    Array.from(document.getElementsByName("projec")).map(element => element.className = "w3-round w3-white w3-row");
    document.getElementById(e.target.value).className ='w3-round w3-grey w3-row';
    reactDOM.render(
        <div className='todo-app'>
          <TodoListTasks projectName={e.target.name} status="TODO" showb={true} name="TODO Tasks" bool="false" />
        </div>,
      document.getElementById('todo')
    );

    reactDOM.render(
        <div className='todo-app'>
          <TodoListTasks projectName={e.target.name} status="IN_PROGRESS" showb={false} name="In Progress Tasks" bool="false" />
        </div>,
      document.getElementById('ipro')
    );

    reactDOM.render(
        <div className='todo-app'>
          <TodoListTasks projectName={e.target.name} status="DONE" showb={false} name="Finished Tasks" bool="false" />
        </div>,
      document.getElementById('do')
    );


    }


    
     showTasksClick (e,name) {
      Array.from(document.getElementsByName("projec")).map(element => element.className = "w3-round w3-white w3-row");
      document.getElementById(e).className ='w3-round w3-grey w3-row';
      reactDOM.render(
          <div className='todo-app'>
            <TodoListTasks projectName={name} status="TODO" showb={true} name="TODO Tasks" bool="false" />
          </div>,
        document.getElementById('todo')
      );
  
      reactDOM.render(
          <div className='todo-app'>
            <TodoListTasks projectName={name} status="IN_PROGRESS" showb={false} name="In Progress Tasks" bool="false" />
          </div>,
        document.getElementById('ipro')
      );
  
      reactDOM.render(
          <div className='todo-app'>
            <TodoListTasks projectName={name} status="DONE" showb={false} name="Finished Tasks" bool="false" />
          </div>,
        document.getElementById('do')
      );
  
  
      }
    // avoir le token de l'utilisateur connecté
     getToken = () => {
       const token = sessionStorage.getItem('token');
       return JSON.parse(token);
    }

    getProjects = (project,email) => {
      const emails = project.users.map(user => user.email);
      return emails.includes(email);
    }

    handleUser = (name,users) => {  
      
      reactDOM.render(
        <PostCompUsers projectN={name} users={users} />,
        document.getElementById('root')
      );
    }

    closeAll = () => {
      
      var projects = this.state.projects.filter( project => this.getProjects(project,this.getToken().email) );
      
      projects.map(project => {
        var pro = project.name + "U";
        
        reactDOM.render(
          <div></div>,
          document.getElementById(pro)
        );
      });
    }
    
    closeInfo = (e) => {
      
      reactDOM.render(
        <div> </div>,
        document.getElementById(e)
      );
    }

    showData = e => {
      this.closeAll();
      
      
      var val = e.target.name + "U";
      var value = (
        <div className="userdetails" style={{color:"#000000",textAlign: "left", marginLeft: "0", marginTop: "-18%",background: "#d0d1d9" ,padding : "0"}}>
                              <div className="user" > 
                              <div style={{display:"inline-block"}}>  <AiOutlineInfoCircle /> </div>
                                   <div style={{display:"inline-block",    marginLeft: "146px"}} className="email divU"   onClick={() => this.closeInfo(val)}> <AiOutlineCloseCircle /></div> 
                                   
                              </div>
                              <div  className="name divU"> < GoDiffRenamed /> <p style={{display:"inline-block"}} className="infoC">name :</p> {e.target.name}  </div>
                              <div className="email divU"> <GoDiffRenamed /> <p style={{display:"inline-block"}} className="infoC">description :</p>{e.target.value} </div>
        </div>
      );
      reactDOM.render(
        value,
        document.getElementById(val)
      );
      
    }

  render() {
    return (
      
         this.state.projects.filter( project => this.getProjects(project,this.getToken().email) ).map(person => 
        
        <div onClick={() => this.showTasksClick(person.id,person.name)} value={person.id} id={person.id} key={person.id} name="projec" className=" w3-round w3-white w3-row"  style={{marginBottom:"18px",
        padding:"12px 30px 12px 5px",display: "flex",    alignItems: "center" ,width: "88%",marginLeft: "5%"}}>
			  
                    <div  className="w3-threequarter w3-container " >
                
                   
                      <p style={{textAlign:"left"}} >{person.name} </p>
                    
                    
                    <div className="w3-row" style={{    width: "65px" , display : "inline-flex" ,marginRight : "72%" }}>
                      <div className="w3-quarter w3-container" style={{paddingLeft: "0px"}}>
                    <button style={{fontSize: "13px",padding: "4px 11px",marginRight: "67%"}} className="w3-button w3-light-blue  w3-round-large">{person.users.length}</button>
                    </div>
                    <div className=" w3-quarter w3-container">
                    <button  style={{fontSize: "13px",padding: "4px 11px",marginLeft:"8px",marginRight: "67%"}} className="w3-button w3-blue w3-round-large" name={person.name} value={person.id}  onClick={this.showTasks}>{this.state.tasks.filter(task => (task.project.name === person.name) ).length}</button>
                    </div>
                    <div className=" w3-quarter w3-container" style={{ padding: "0px 30px"}}>
                    <button  style={{fontSize: "13px",padding: "4px 11px",marginLeft:"8px",marginRight: "67%"}} className="w3-button w3-blue w3-round-large" name={person.name} value={person.description}  onClick={this.showData}>info</button>
                    </div>
                 
                  </div>
                  
                    
                  </div>
                  <div className="w3-container w3-quarter">
                  <button className="w3-button w3-red w3-round-large" onClick={() => this.handleUser(person.name,person.users)} value={person.name} >Add User</button>
                  </div>
                  <div id={person.name + "U"} style={{    position: "absolute",marginTop: "18%"}} className="data" >
                  </div>
              
   </div>)


     
   
       

     
    )
  }
}
