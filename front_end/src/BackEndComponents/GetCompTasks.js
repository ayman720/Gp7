
import '../App.css';
import React, {Component} from 'react'
import axios from 'axios'
import 'w3-css/w3.css';
import ReactDOM from 'react-dom';
import App from '../App';
import Formconfirm from '../Formconfirm';
import { FaArrowRight } from "react-icons/fa";
import reactDOM from 'react-dom';
import { AiOutlineInfoCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { GoDiffRenamed } from 'react-icons/go';


// component qui communique avec les api surtout pour avoir les tâches de l'utilisateur connecté
export default class GetComp extends Component {
  state = {
    tasks: [] ,
    reset : false ,
  }

  componentDidMount() {
    async function getData(url = '') {
      const response = await axios.get(url);
      return  await response.data;
    }
    setTimeout(() => {
      getData('http://localhost:8080/api/tasks').then(data => {
        this.setState({ tasks: data });
      });
    }, 200);


    
  }

  // changer la tâche de todo à done
  send = (status) => {

    ReactDOM.render(
          <Formconfirm name={status.target.name} value={status.target.value} projectN={this.props.projectN} />,
        document.getElementById('root')
      );
      
      
    

  }


  // fonction si on a todo il retourne in progress si on a in progress il retourne done
  showTasks = (e,b) => {
    if(e === "TODO"){
      return  <button style={{fontSize: "13px",padding: "8px 11px",marginLeft: "80%",marginTop: "8%"}} value="IN_PROGRESS" name={b} onClick={this.send} className="w3-button w3-blue w3-round-large">  <FaArrowRight style={{marginTop:"3px"}} /> </button>;
    }
    else if(e === "IN_PROGRESS"){
      return  <button style={{fontSize: "13px",padding: "8px 11px",marginLeft: "80%",marginTop: "8%"}} name={b} value="DONE" onClick={this.send} className="w3-button w3-blue w3-round-large">  <FaArrowRight style={{marginTop:"3px"}} /> </button>;
    }
    else if(e === "DONE"){
      return ;
    }
  }
  
  closeAll = () => {
    
    var tasks = this.state.tasks.filter(task => (task.project.name === this.props.projectN) );
    
    tasks.map(task => {
      var ta = task.name + "UT";
      
      reactDOM.render(
        <div></div>,
        document.getElementById(ta)
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
    
    
    var val = e.target.name + "UT";
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
      
         this.state.tasks.filter(task => (task.taskStatus === this.props.status) && (task.project.name === this.props.projectN) ).map(person => 
        
          <div key={person.id} className=" w3-round w3-white w3-row"  style={{marginBottom:"18px",
        padding:"12px 30px 12px 5px",display: "flex",    alignItems: "center" ,width: "88%",    marginLeft: "5%"}}>
			  
                  <div  className= "w3-threequarter w3-container" >
                
                   
                      <p style={{textAlign:"left"}} >{person.name } <b>from</b>  {person.project.name}  </p>
                    
                    
                   

                      <div className="w3-row" style={{  display:"inline-flex", marginTop: "10px" ,width: "111px",marginLeft : "-49%"}}>
                          <div className="w3-half w3-container" style={{paddingLeft: "0px"}}>
                            <button style={{fontSize: "13px",padding: "4px 11px",marginLeft:"0px",marginRight: "67%"}} className="w3-button w3-purple w3-round-large">{person.user.name}</button>
                          </div>
                          <div className=" w3-half w3-container">
                            <button style={{fontSize: "13px",padding: "4px 11px",marginLeft:"0px",marginRight: "67%"}} className="w3-button w3-orange w3-round-large">{person.taskStatus}</button>
                          </div>
                          <div className=" w3-quarter w3-container" style={{ padding: "0px 25px"}}>
                          <button  style={{fontSize: "13px",padding: "4px 11px",marginLeft:"43px",marginRight: "67%"}} className="w3-button w3-blue w3-round-large" name={person.name} value={person.description}  onClick={this.showData}>info</button>
                          </div>

                          

                      </div>
                    
                    
                  </div>
                  <div className=" w3-quarter w3-container">
                    {this.showTasks(person.taskStatus,person.id)}
                 </div>
                 <div id={person.name + "UT"} style={{    position: "absolute", marginTop: "20%", marginLeft : "3%"}} className="data" >
                  </div>
          </div>)


     
   
       

      
    )
  }
}
