import {useState, useEffect} from 'react'
import styled from 'styled-components'
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import dayjs from 'dayjs'


import Header from './Header.js'
import Footer from './Footer.js'

import {useContext} from 'react'

import Context from './Context'

export default function Hoje(props){

    const userData = useContext(Context);

    const nav= useNavigate();

    const config = {
        headers: {
            "Authorization": `Bearer ${userData.token}`
        }
    }

    const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

    const prom = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today', config);

    prom.then(success);
    prom.catch(error);

    function success(res){
        //console.log(res);
    }

    function error(res){
        nav('/');
    }

    return(<>
        <Header/>
        <Content>
            <Data>
                {diasSemana[dayjs().day()]}, {dayjs().date()}/{dayjs().month()+1}
            </Data>
            <Concluidos>
                Nenhum hábito concluído ainda
            </Concluidos>
        </Content>
        <Footer/>
    </>)
}

const Data = styled.div`
    color: #126BA5;
    font-family: Lexend Deca;
    font-size: 23px;
    font-weight: 400;
    line-height: 29px;
    text-align: left;
`

const Content = styled.div`
    padding: 17px;
    box-sizing: border-box;
    background: #F2F2F2;
    min-height: 100vh;
`

const Concluidos = styled.div`
    color: #BABABA;
    font-family: Lexend Deca;
    font-size: 18px;
    font-weight: 400;
    line-height: 22px;
    text-align: left;
`
const f = styled.div`

`
const e = styled.div`

`

