import React, { useState, useReducer, useEffect } from "react";
import Controls from "./Controls";
import Canvas from "./Canvas";
import GameStart from "./GameStart.js";
import Timer from "./Timer.js";
import DisplayText from "./DisplayText.js";

const labels = require("./labels.json");
let ref = React.createRef();
const maxRounds = 10;

export const GameContext = React.createContext();

export function useGameState(round) {        
    if (round === 0) {
        return 'init';
    } else if (round === maxRounds + 1) {
        return 'end';
    } else {
        return 'game';
    }

}

function scoreReducer(score, action) {
    switch (action.type) {
        case 'increment':
            return score + 1;
        case 'decrement':
            return score - 1;
        case 'reset':
            return 0;
        default:
            throw new Error();
    }
}

function roundReducer(gameRound, action) {
    switch (action.type) {
        case 'nextRound':
            return gameRound + 1;
        case 'init':
        case 'reset':
            return 0;
        default:
            return;
    }
}

function roundActiveReducer(roundActive, action) {
    switch (action.type) {
        case 'roundActive':
            return true;
        case 'roundInactive':
            return false;
        default:
            return;
    }
}

export default function Game({ model, gameRoundProp }) {
    const [gameRound, setGameRound] = useReducer(roundReducer, 0);
    const [score, setScore] = useReducer(scoreReducer, 0);
    const [roundActive, setRoundActive] = useReducer(roundActiveReducer, false);
    const [question, setQuestion] = useState();
    const [roundWin, setRoundWin] = useState();
    console.log("GameRound: " + gameRound)

    useEffect(() => {
        if (gameRoundProp.gameRound === 0) {
            setGameRound({ type: 'init' });
        } else if (gameRoundProp.gameRound === 1) {
            gameRoundProp.gameRound = undefined;
            setScore({ type: 'reset' });

            setGameRound({ type: 'reset' });
            setRoundWin(undefined)
            startNewRound();
        }
    }, [gameRoundProp.gameRound]);

    function handleClick(e) {
        startNewRound();
    }

    function startNewRound() {
        if (gameRound <= maxRounds) {
            setRoundActive({ type: 'roundActive' });
            setGameRound({ type: 'nextRound' });
            setQuestion(labels[gameRound]);
        }
    }

    function handleCorrectAnswer() {
        setRoundWin(true);
        setScore({ type: 'increment' });
        setRoundActive({ type: 'roundInactive' });
        startNewRound();
    }

    function handleTimeUp() {
        setRoundWin(false);
        setScore({ type: 'decrement' });
        setRoundActive({ type: 'roundInactive' });
        startNewRound();
    }

    const gameState = useGameState(gameRound)

    function gameRender() {
        switch (gameState) {
            case 'init':
                return <GameStart handleClick={handleClick} />;
            case 'game':
                return (
                    <div>
                        <Timer roundActive={roundActive} handleTimeUp={handleTimeUp} />
                        <label> Round: {gameRound} Score: {score}</label><br></br>
                        <Canvas ref={ref} model={model} labels={labels} question={question} correctAnswer={handleCorrectAnswer} />
                        <Controls theCanvas={ref} model={model} labels={labels} />
                    </div>);
            case 'end': return <div></div> //This is empty because all text is handeld in Display Text Component
            default: 
                return;
        }
    }

    return (
        <GameContext.Provider
            value=
            {{
                "gameRound": gameRound,
                "label": labels[gameRound - 1],
                "roundWin": roundWin,
                "score": { score }
            }}>
            <DisplayText />
            {gameRender()}
        </GameContext.Provider>
    )
}