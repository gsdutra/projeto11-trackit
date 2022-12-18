import {Link} from 'react-router-dom'
import styled from 'styled-components'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import {useContext} from 'react'
import Context from '../Contexts/ContextUserData.js'

export default function Footer(props){

    const contextObj = useContext(Context);
    const percent = contextObj.percent;

    return(<div data-test="menu">
    <FooterStyled>
        <Link to='/habitos' data-test="habit-link">Hábitos</Link>
        <Link to='/historico' data-test="history-link">Histórico</Link>
    </FooterStyled>
    
    
    <Link to='/hoje' data-test="today"><Hoje><span>
        <CircularProgressbar
            value={percent}
            text="Hoje"
            styles={buildStyles({
            backgroundColor: "#3e98c7",
            textColor: "#fff",
            pathColor: "#fff",
            trailColor: "transparent"
            })}/>
        </span></Hoje></Link>
    </div>)
}
const Hoje = styled.div`
    height: 90px;
    width: 90px;
    border-radius: 50%;
    z-index: 6;
    position: fixed;
    bottom: 10px;
    background: #52B6FF;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 50%;
    transform: translate(-45px, 0);
    color: white;
    font-family: Lexend Deca;
    font-size: 18px;
    font-weight: 400;
    line-height: 22px;
    padding: 6px;
    box-sizing: border-box;
`

const FooterStyled = styled.div`
    height: 70px;
    width: 100%;
    background: white;
    position: fixed;
    bottom: 0px;
    z-index: 5;
    display: flex;
    justify-content: space-around;
    align-items: center;
    a{
        color: #52B6FF;
        font-family: Lexend Deca;
        font-size: 18px;
        font-weight: 400;
        line-height: 22px;
        letter-spacing: 0em;
        text-align: center;
        text-decoration: none;
    }
`