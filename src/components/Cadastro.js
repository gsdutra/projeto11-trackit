import {useState, useEffect} from 'react'
import styled from 'styled-components'
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom"
import axios from 'axios'

import logo from '../assets/logo.png'

export default function Cadastro(props){

	const nav = useNavigate()

	const[userEmail, setUserEmail] = useState("")
	const[password, setPassword] = useState("")
	const[nome, setNome] = useState("")
	const[foto, setFoto] = useState("")

	const[disabled, setDisabled] = useState(false);

	const [form, setForm] = useState({
		email: '',
		name: '',
		image: '',
		password: ''
	})

	function handleForm (e) {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		}) 
	}

	function submitSignIn(event){
		event.preventDefault();
		setDisabled(true);
		const prom = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up', form);

		prom.then(()=>nav("/"));
		prom.catch(()=>setDisabled(false));
	}

	return(<Display>
		<img src={logo}/>
		
		<Form>
			<form onSubmit={submitSignIn}>
				<input required type="email" name="email" value={form.email} onChange={handleForm} placeholder="email" disabled={disabled} data-test="email-input"/>

				<input required type="text" name="password" value={form.password} onChange={handleForm} placeholder="senha" disabled={disabled} data-test="password-input"/>

				<input required type="text" name="name" value={form.name} onChange={handleForm} placeholder="nome" disabled={disabled} data-test="user-name-input"/>

				<input required type="url" name="image" value={form.image} onChange={handleForm} placeholder="foto" disabled={disabled} data-test="user-image-input"/>

				<button type="submit" disabled={disabled} data-test="signup-btn">
						Cadastrar
				</button>
			</form>
		</Form>
		<Link to="/" data-test="login-link"><span>Já tem uma conta? Faça login!</span></Link>
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
		}
	}
`