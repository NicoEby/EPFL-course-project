import React, { useContext } from "react";
import { GameContext, useGameState } from "./Game.js";
import TypedText from './TypedText.js';

const gameTexts = require("./gameTexts.json");

export default function DisplayText() {
    const { gameRound, label, roundWin, score } = useContext(GameContext);
    const gameState = useGameState(gameRound);

    function mainText() {
        switch (gameState) {
            case 'init':  //Before game starts
                return gameTexts.startText;

            case 'game': //Game is ongoing
                let text = "";

                if (roundWin) {
                    text = (<div><TypedText strings={[gameTexts.roundWin]} /><br /> </div>);
                } else {
                    text = (<div><TypedText strings={[gameTexts.roundLoss]} /><br /> </div>);
                }
                if (typeof roundWin === "undefined") { //Firstround
                    text = (<div><br /><br /></div>);
                }
                return (<div>{text} {gameTexts.roundText}<b>{label}</b>!</div>);

            case 'end': //After game has ended
                let endText = "";

                if (score === 0) {
                    endText = gameTexts.gameEven;
                } else if (score > 0) {
                    endText = gameTexts.gameWin;
                } else {
                    endText = gameTexts.gameLoss;
                }
                return <div>{"Your Final Score: " + score.score} <br /> {endText} </div>;
            default:
                return;
        }
    }

    return (
        <div>
            {mainText()}
        </div>
    );
}