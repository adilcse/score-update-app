import { useEffect, useState } from "react";
import styled from "styled-components";

const Score = styled.p`
font-size: 18px;
color: ${props =>  props.position===1? 'red':
props.position===2? 'purple':
props.position===3? 'blue':
'tomato'}`

const MAX_UPDATE = 20;
const UPDATE_INTERVAL = 40;

const AnimatedScore = ({position, score, lastScore}) => {
    const [newScore, setNewScore] = useState(lastScore);
    useEffect(() => {
        if (lastScore === score) {
            return;
        }
        const steps = Math.ceil(Math.abs(lastScore - score) / MAX_UPDATE);
        const inc = lastScore < score  ? steps : -steps;
        let upScore = lastScore;
        let timer = setInterval(()=> {
            upScore += inc;
            if ((inc > 0 && upScore > score) || (inc < 0 && upScore < score)) {
                upScore = score;
            }
            setNewScore(upScore);
            if (upScore === score) clearInterval(timer)  
        }, UPDATE_INTERVAL);
    }, [score, lastScore])
    
    return (
        <Score position={position}>{newScore}pt</Score>
    )
}
export default AnimatedScore;