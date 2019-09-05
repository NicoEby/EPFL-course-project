import React, { useEffect, useRef, useReducer } from "react";


function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    });

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        let id = setInterval(tick, delay);
        return () => clearInterval(id);
    }, [delay]);
}

function timerReducer(timer, action) {
    switch(action.type) {
        case 'reset':
            return 20;
        case 'countDown':
            return timer - 1;
        default:
            return; 
    }
}

export default function Timer(props) {
    const [timer, setTimer] = useReducer(timerReducer, 20);
    const roundActive = props.roundActive

    

    useEffect(() => {
         setTimer({ type: 'reset'});
    }, [roundActive, props])



        useInterval(() => {
            if (timer > 0) {        //Clock runs until 0
                    setTimer({ type: 'countDown'});
            }
        }, 1000);


    if (timer === 0) {
        props.handleTimeUp();
        setTimer({ type: 'reset'});
    }

    return (
        <label>Time Remaining: {timer}</label>
    )
}