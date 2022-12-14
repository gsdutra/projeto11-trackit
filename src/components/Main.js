import {useState, useEffect} from 'react'
import styled from 'styled-components'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import logo from '../assets/logo.png'

export default function Main(props){

    const[userEmail, setUserEmail] = useState("")
    const[password, setPassword] = useState("")

    function submitLogin(){

    }

    return(<Display>
        <img src={logo}/>
        
        <Form>
            <form onSubmit={submitLogin}>
                <input required type="text" value={userEmail} onChange={e => setUserEmail(e.target.value)} placeholder="email"/>

                <input required type="text" value={password} onChange={e => setpassword(e.target.value)} placeholder="senha"/>

                <button type="submit">
                        Entrar
                    </button>
            </form>
        </Form>
    </Display>)
}

const Display = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
        margin-top: 68px;
        margin-bottom: 32px;
        width: 180px;
        height: auto;
    }
`

const Form = styled.div`
    form{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`