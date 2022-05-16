import React from "react"

const Scoreboard = ({score, bestScore}) => {
    return (
        <div className="scoreboard-container">
            <h2>Best Score: {bestScore}</h2>
            <h2>Score: {score}</h2>
        </div>
    );
}

export default Scoreboard;