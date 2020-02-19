import React from "react";
import ReactDOM from "react-dom";

import {Stage} from "@inlet/react-pixi";
import * as PIXI from "pixi.js";

const config = require("./config/config");

class App extends React.Component{
    render(){
        return <Stage height={config.height} width={config.width}>
            
        </Stage>
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
)