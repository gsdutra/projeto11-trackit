import Header from './Header.js'
import Footer from './Footer.js'

import {useState, useEffect} from 'react'
import styled from 'styled-components'
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom"
import axios from 'axios'

import Context from './Context.js'
import {useContext} from 'react'

import trash from '../assets/trash.png'

import * as Loader from "react-loader-spinner";

export default function Habitos(props){

	const userData = useContext(Context);

	const nav= useNavigate();

	const [diasSelec, setDias] = useState([]);
	const [showCreateHabit, setShow] = useState(false);
	const [nomeHabito, setNome] = useState("");

	const[disabled, setDisabled] = useState(false);

	const [todosHabitos, setHabitos] = useState([]);

	const diasSemana = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

	const config = {
		headers: {
			"Authorization": `Bearer ${userData.token}`
		}
	}

	const prom = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', config);

	prom.then(success);
	prom.catch(error);

	function success(res){
		setHabitos(res.data);
	}

	function error(res){
		nav('/');
	}

	function done(){
		setDisabled(false);
		setDias([]);
		setNome("");
		setShow(false)
	}

	function postNovoHabito(event){
		setDisabled(true);
		event.preventDefault();
		const prom = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",{
			name: nomeHabito,
			days: diasSelec
		},config);

		prom.then(done);
	}

	function addDia(dia){
		if (diasSelec.includes(dia)){
			const newDia = [...diasSelec];
			newDia.splice(newDia.indexOf(dia),1);
			setDias(newDia);
			//console.log(newDia);
		}else{
			const newDia = [...diasSelec, dia];
			newDia.sort();
			setDias(newDia);
			//console.log(newDia);
		}
	}

	function deletarHab(id){
		if(confirm("Tem certeza que deseja deletar o hábito?"))
		{
			const prom = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, config);

			prom.then(()=>console.log('Hábito deletado com sucesso'));
		}
	}

	return(<>
		<Header/>
			<Content>
				<MeusH>
					<div>Meus hábitos</div>
					<button onClick={()=>setShow(true)}>+</button>
				</MeusH>

				<AddHabito hidden={!showCreateHabit}>
					<form onSubmit={postNovoHabito}>
					<input required type="text" value={nomeHabito} onChange={e => setNome(e.target.value)} placeholder="nome do hábito" disabled={disabled}/>
					<Dias>
						{diasSemana.map((e, i)=>
						<Dia key={i} onClick={()=>addDia(i)}
						selecionado={diasSelec.includes(i)}
						>{e}</Dia>
						)}
					</Dias>
					<Botoes>
						
							<button type="button" Style="
							background: transparent;
							color: #52B6FF;
							" onClick={done}>Cancelar</button>
						
							<button type="submit">
								{disabled?
								<Loader.ThreeDots color="white" height="50" width="50" />
								:
								'Salvar'}</button>
					</Botoes>
					</form>
				</AddHabito>
				
				<Txt hidden={todosHabitos.length>0?true:false}>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</Txt>

				<ListaHabitos>
					{todosHabitos.map((eHab)=>
					<AddHabito>
						<TituloHab>
							<span>{eHab.name}</span>
							<img src={trash} alt="" onClick={()=>deletarHab(eHab.id)}/>
						</TituloHab>
						<Dias>
							{diasSemana.map((e, i)=>
							<Dia key={i} selecionado={eHab.days.includes(i)}
							>{e}</Dia>
							)}
						</Dias>
					</AddHabito>
					)}
				</ListaHabitos>
			</Content>
		<Footer/>
	</>)
}

const TituloHab = styled.div`
	font-family: Lexend Deca;
	font-size: 20px;
	font-weight: 400;
	line-height: 25px;
	letter-spacing: 0em;
	text-align: left;
	color: #666666;
	margin-bottom: 8px;
	display: flex;
	justify-content: space-between;
	img{
		height: 15px;
		width: auto;

		transition: .2s;
			&:hover{
				transform: scale(1.2);
				transition: .2s;
				cursor: pointer;
			}		
	}
`

const ListaHabitos = styled.div`

`
const Botoes = styled.div`
	margin-top: 29px;
	display: flex;
	justify-content: flex-end;
	button{
		display: flex;
		justify-content: center;
		align-items: center;
	}
`
const Dias = styled.div`
	display: flex;
`
const Dia = styled.div`
	padding-top: 4px;
	color: ${props=>props.selecionado?'white':'#DBDBDB'};
	background: ${props=>!props.selecionado?'white':'#DBDBDB'};
	border: 1px solid #D4D4D4;
	height: 30px;
	width: 30px;
	border-radius: 5px;
	margin-bottom: 6px;
	font-family: Lexend Deca;
	font-size: 20px;
	font-weight: 400;
	text-align: center;
	box-sizing: border-box;
	margin-right: 4px;

	transition: .2s;
	&:hover{
		transform: scale(1.08);
		transition: .2s;
		cursor: pointer;
	}
`
const AddHabito = styled.div`
		background: white;
		padding: 18px;
		box-sizing: border-box;
		border-radius: 5px;
		margin-top: 22px;

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
			::placeholder{
				color: #DBDBDB;
			}
		}
		button{
			background: #52B6FF;
			font-family: Lexend Deca;
			font-size: 16px;
			font-weight: 400;
			line-height: 26px;
			letter-spacing: 0em;
			text-align: center;
			height: 35px;
			width: 84px;
			border-radius: 4.64px;
			border: none;
			color: white;
			margin-left: 23px;

			transition: .2s;
			&:hover{
				transform: scale(1.02);
				transition: .2s;
				cursor: pointer;
			}
		}
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
	button{
		background: #52B6FF;
		border: none;
		height: 35px;
		width: 40px;
		border-radius: 4.64px;

		font-family: Lexend Deca;
		font-size: 27px;
		font-weight: 400;
		color: white;
		line-height: 100%;

		padding-bottom: 5px;

		transition: .2s;
			&:hover{
				transform: scale(1.07);
				transition: .2s;
				cursor: pointer;
			}			
	}
`

const Content = styled.div`
	padding: 17px;
	box-sizing: border-box;
	background: #F2F2F2;
	min-height: 100vh;
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