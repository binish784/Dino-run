import React from "react";
import ReactDOM from "react-dom";


class App extends React.Component{
    render(){
        return <h2>Hello There</h2>
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
)