import {useState, useEffect} from 'react'
import styled from 'styled-components'
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import dayjs from 'dayjs'

import Header from './Header.js'
import Footer from './Footer.js'
import verified from '../assets/verified.png'

import {useContext} from 'react'

import Context from './Context'

export default function Hoje(props){

	const userData = useContext(Context);

	const [listaHabitos, setHabitos] = useState([]);

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
		setHabitos(res.data);
	}

	function error(res){
		nav('/');
	}

	function toggleFeito(id, done){
		console.log('V');
		const prom = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/${done?'uncheck':'check'}`, config);

		prom.then(res=>console.log(res));
		prom.catch(res=>console.log(res));
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
			<ListaHabitos>
				{listaHabitos.map((e, i)=>
				<Habito key={i}>
					<div>
						<div Style="font-size: 20px; line-height: 35px;">
							{e.name}
							{e.done?'Feito':'notFeito'}
						</div>
						<div Style="font-size: 13px;">
							Sequência atual: {e.currentSequence} dias<br/>
							Seu recorde: {e.highestSequence} dias
						</div>
					</div>
					<Box>
						<img src={verified} alt="" done={e.done} onClick={()=>toggleFeito(e.id, e.done)}/>
					</Box>
				</Habito>
				)}
			</ListaHabitos>
		</Content>
		<Footer/>
	</>)
}

const ListaHabitos = styled.div`

`

const Box = styled.div`
	background: ${props=>props.done?'#8FC549':'#EBEBEB'};
	height: 69px;
	width: 69px;
	border-radius: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: .2s;
	&:hover{
		transform: scale(1.07);
		transition: .2s;
		cursor: pointer;
	}	
`

const Habito = styled.div`
	background: white;
	padding: 13px;
	box-sizing: border-box;
	border-radius: 5px;
	margin-top: 22px;
	text-align: left;
	display: flex;
	justify-content: space-between;
	div{
		color: #666666;
		font-family: Lexend Deca;
		font-weight: 400;
		line-height: 17px;
	}
`

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

