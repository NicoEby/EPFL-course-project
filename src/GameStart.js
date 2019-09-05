import React from "react";
import { withRouter } from 'react-router-dom';

class GameStart extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    nextPath(path) {
        this.props.history.push(path);
    }

    handleClick(e) {
        this.props.handleClick();
    }

    render() {
        return (
            <div>
                <button onClick={() => {
                    this.nextPath("/game");
                    this.handleClick();
                }}>Start Game</button>
            </div>
        );
    }
}

export default withRouter(GameStart);