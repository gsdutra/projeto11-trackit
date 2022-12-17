import Header from './Header.js'
import Footer from './Footer.js'

import {useState, useEffect} from 'react'
import styled from 'styled-components'
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom"
import axios from 'axios'

import Context from '../Contexts/ContextUserData.js'
import {useContext} from 'react'

export default function Historico(props){
    return(<>
        <Header/>
        <Content>
            <MeusH>
                <div>Histórico</div>
            </MeusH>
            <Txt>Em breve você poderá ver o histórico dos seus hábitos aqui!</Txt>
        </Content>
        <Footer/>
    </>)
}

const Content = styled.div`
	padding: 17px;
	box-sizing: border-box;
	background: #F2F2F2;
	min-height: 100vh;
`

const MeusH = styled.div`
	color: #126BA5;
	font-family: Lexend Deca;
	font-size: 23px;
	font-weight: 400;
	line-height: 29px;
	text-align: left;
	display: flex;
	justify-content: space-between;
`

const Txt = styled.div`
	margin-top: 28px;
	color: #BABABA;
	font-family: Lexend Deca;
	font-size: 18px;
	font-weight: 400;
	line-height: 22px;
	text-align: left;
`