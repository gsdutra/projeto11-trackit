import {Link} from 'react-router-dom'
import styled from 'styled-components'

export default function Footer(props){
    return(<FooterStyled>
        <Link to='/habitos'>Hábitos</Link>
        <Link to='/historico'>Histórico</Link>
    </FooterStyled>)
}

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