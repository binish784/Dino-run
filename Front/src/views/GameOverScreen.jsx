import React,{Component} from "react";

const config = require("../config/config");

import service from "../services/ScoreService";

class MenuScreen extends Component{

    constructor(props){
        super(props);
        this.state={
            username:"Username",
            scoreAdded:false,
            message:"",
            position:null,
            score:0,
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleKeyPress=this.handleKeyPress.bind(this);
        

    }

    componentDidMount(){
        document.addEventListener("keypress",this.handleKeyPress);
        if(this.props.history.action!= "PUSH"){
            this.props.history.push("/");
        }
        console.log("Game OVer at",this.props.location.state.score);
        this.setState({score:this.props.location.state.score});

    }

    componentWillUnmount(){
        document.removeEventListener("keypress",this.handleKeyPress);
    }

    handleChange(e){
        this.setState({
            username:e.target.value
        })
    }

    handleKeyPress(e){
        if(e.keyCode==32 && this.state.scoreAdded){
            this.props.history.push("/");
        }
    }

    async handleSubmit(e){
        e.preventDefault();
        if(this.state.username.length!=0){
            const response= await service.addScore(this.state.username,this.state.score);
            if(response.success){
                this.setState({scoreAdded:true,message:"Your score has been added",position:response.data[0].position});
            }else{
                this.setState({message:"Failed to add score, try submitting again"})
            }
        }
        return;
    }

    render(){
        
       return   <div>
                    {this.state.scoreAdded ? 
                    <div>Your Position in score board : {this.state.position}
                    <br></br>
                    <br></br>
                        Press Space for Menu
                    </div> : 
                    <div>
                        <form onSubmit={this.handleSubmit}>
                        Place your mark in the Score Board
                        <br></br>
                        <br></br>
                        <input type="text" onChange={this.handleChange} required id="username" placeholder="Enter Your Username"></input>
                        <input type="submit" id="username"></input>
                        <br></br>
                        <br></br>
                        {this.state.username} : {this.state.score}
                    </form>
                    
                    </div>}
                    
                    {this.state.message}
                    
                </div>
       
    }
}


export default (MenuScreen);