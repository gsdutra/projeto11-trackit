import {useState, useEffect} from 'react'
import styled from 'styled-components'
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom"
import axios from 'axios'

import Header from './Header.js'

import logo from '../assets/logo.png'

export default function Login(props){

	const nav = useNavigate()

	const[userEmail, setUserEmail] = useState("")
	const[password, setPassword] = useState("")

	const[disabled, setDisabled] = useState(false);

	function submitLogin(event){
		event.preventDefault();
		setDisabled(true);
		const prom = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login',
		{
			email: userEmail,
			password: password
		})

		prom.then(validLogin);
		prom.catch(badLogin);
	}

	function validLogin(elem){
		props.setUserData(elem.data);
		nav('/hoje');
	}

	function badLogin(){
		alert('Usuário ou senha inválidos');
		setDisabled(false);
	}

	return(<Display>
		<img src={logo}/>
		
		<Form>
			<form onSubmit={submitLogin}>
				<input required type="text" value={userEmail} onChange={e => setUserEmail(e.target.value)} placeholder="email" disabled={disabled}/>

				<input required type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="senha" disabled={disabled}/>

				<button type="submit" disabled={disabled}>
						Entrar
				</button>
			</form>
		</Form>
		<Link to="/cadastro"><span>Não tem uma conta? Cadastre-se!</span></Link>
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
	span{
		color: #52B6FF;
		text-decoration: underline;
		font-family: Lexend Deca;
		font-size: 14px;
		font-weight: 400;
		line-height: 17px;
		letter-spacing: 0em;
		text-align: center;
	}
`

const Form = styled.div`
	form{
		display: flex;
		flex-direction: column;
		align-items: center;
		input{
			border: 1px solid #D4D4D4;
			height: 45px;
			width: 303px;
			border-radius: 5px;
			margin-bottom: 6px;
			font-family: Lexend Deca;
			font-size: 20px;
			font-weight: 400;
			line-height: 25px;
			letter-spacing: 0em;
			text-align: left;
			padding-left: 11px;
			box-sizing: border-box;
		}
		button{
			background: #52B6FF;
			font-family: Lexend Deca;
			font-size: 21px;
			font-weight: 400;
			line-height: 26px;
			letter-spacing: 0em;
			text-align: center;
			height: 45px;
			width: 303px;
			border-radius: 4.64px;
			border: none;
			color: white;
			margin-bottom: 25px;

			transition: .2s;
			&:hover{
				transform: scale(1.02);
				transition: .2s;
				cursor: pointer;
			}			
		}
	}
`