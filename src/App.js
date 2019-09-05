import React from "react";
import Game from "./Game";
import * as tf from "@tensorflow/tfjs";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const model = tf.loadModel("./model/model.json");

class App extends React.Component {
  render() {
    return (
      <Router>
        <Link to="/home">Home</Link>
        <Link to="/game">New Game</Link>

        <Route
          path='/home'
          render={(props) => (<Game {...props} model={model} gameRoundProp={{gameRound : 0}}/>)}
        />
        <Route
          path="/game"
          render={(props) => (<Game {...props} model={model} gameRoundProp={{gameRound: 1}}/> )}
        />

      </Router>
    );
  }
}

export default App;
