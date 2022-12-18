import {useState, useEffect} from 'react'
import styled from 'styled-components'
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import dayjs from 'dayjs'

import Header from './Header.js'
import Footer from './Footer.js'
import verified from '../assets/verified.png'

import {useContext} from 'react'

import Context from '../Contexts/ContextUserData.js'

export default function Hoje(props){

	const contextObj = useContext(Context);

	const [listaHabitos, setHabitos] = useState([]);

	const verifPorcent = contextObj.percent;
	const setPercent = contextObj.setPercent;

	const nav= useNavigate();

	const config = {
		headers: {
			"Authorization": `Bearer ${contextObj.userData.token}`
		}
	}

	const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

	const prom = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today', config);

	prom.then(success);
	prom.catch(error);

	function success(res){
		setHabitos(res.data);

		var doneHabits = 0;

		for (let index = 0; index < res.data.length; index++) {
			if(res.data[index].done){
				doneHabits++;
			}
		}
		var ratio = (doneHabits/res.data.length)*100;
		setPercent(ratio.toFixed(0));
	}

	function error(res){
		nav('/');
	}

	function toggleFeito(id, done){
		const prom = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/${done?'uncheck':'check'}`, null, config);

		//console.log(prom);

		//prom.then(res=>console.log(res));
		//prom.catch(res=>console.log(res));
	}

	return(<>
		<Header/>
		<Content>
			<Data data-test="today">
				{diasSemana[dayjs().day()]}, {dayjs().date()}/{dayjs().month()+1}
			</Data>
			<Concluidos verde={verifPorcent>0?true:false} data-test="today-counter">
				{verifPorcent>0?
				`${verifPorcent}% dos hábitos concluídos`
				:
				'Nenhum hábito concluído ainda'}
			</Concluidos>
			<ListaHabitos>
				{listaHabitos.map((e, i)=>
				<Habito key={i} data-test="today-habit-container">
					<div>
						<div Style="font-size: 20px; line-height: 35px;" data-test="today-habit-name">
							{e.name}
							{e.done?'Feito':'notFeito'}
						</div>
						<div Style={`font-size: 13px; color:${e.done?'#8FC549':'#666666'}`} data-test="today-habit-sequence">
							Sequência atual: {e.currentSequence} dias
						</div><div Style={`font-size: 13px; color:${e.currentSequence===e.highestSequence?'#8FC549':'#666666'}`} data-test="today-habit-record">
							Seu recorde: {e.highestSequence} dias
						</div>
					</div>
					<Box done={e.done}>
						<img src={verified} alt="" done={e.done} onClick={()=>toggleFeito(e.id, e.done)} data-test="today-habit-check-btn"/>
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
	color: ${props=>props.verde?'#8FC549':'#BABABA'};
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

