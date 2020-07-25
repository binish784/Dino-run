import React,{Component} from "react";

const config = require("../config/config");

import ScoreList from "../layout/component/ScoreList";
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
            scores:[],
            scoreMessage:"Score Loading"
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleKeyPress=this.handleKeyPress.bind(this);
        

    }

    async componentDidMount(){
        
        if(this.props.history.action!= "PUSH"){
            this.props.history.push("/");
        }

        this.setState({score:this.props.location.state.score});

        const fetchedData=await service.fetchHigh();
        if(fetchedData.success){
            let data=fetchedData.data;
            let score_list=[];
            data.forEach((score)=>{
                score_list.push({"key":score._id,"score":score.score,"username":score.username});
            })
            this.setState({
                scores:score_list
            })
        }else{
            this.setState({
                message:"Loading Failed"
            })
        }
    
        document.addEventListener("keypress",this.handleKeyPress);
        
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
        this.setState({
            message:"Submitting Score"
        })
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
        
       return   <div style={{
                        height:config.height,
                        width:config.width,
                        backgroundColor:"skyblue",
                        color:"black",
                        textAlign:"center",
                        position:"relative"
                    }}>
                    
                    
                    <div style={{
                        paddingTop:"0.5rem"
                    }}>
                        {this.state.scoreAdded ? 
                            <p>Your Position in score board : {this.state.position}</p>
                        :
                            <p>Place your mark in the Score Board</p> 
                        }
                    </div>

                    <div>
                    {this.state.scoreAdded ? 
                            <p>Press Space for Menu</p>
                        :
                            <form onSubmit={this.handleSubmit}>
                            <input type="text" onChange={this.handleChange} required id="username" placeholder="Enter Your Username"></input>
                            <input type="submit" id="username"></input>
                            <br></br>
                            {this.state.username} : {this.state.score}
                            </form>
                        }
                    </div>

                    <div>
                        {this.state.message}
                    </div>

                    <div>
                        {this.state.scores.length==0 ?  
                            <p className="scoreTitle">{this.state.scoreMessage}</p> : 
                            <ScoreList scores={this.state.scores} />  }
                    </div>
                    
                        

                </div>    
       
    }
}


export default (MenuScreen);