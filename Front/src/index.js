import React from "react";
import ReactDOM from "react-dom";
import {createBrowserHistory} from "history";
import {Router,Route,Switch,withRouter} from "react-router-dom";

import DinoApp from "./layout/dino";

let hist=createBrowserHistory();

class App extends React.Component{

    render(){
        console.log("App loaded");
        return (
            <div>
                <Router history={hist}>
                    <Switch>
                        <Route key={1} path="/" >
                            <DinoApp />
                        </Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
)