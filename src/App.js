import {useState, useEffect} from 'react'
import styled from 'styled-components'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from './components/Login.js'
import Cadastro from './components/Cadastro'
import Habitos from './components/Habitos'
import Hoje from './components/Hoje'
import Historico from './components/Historico'

import Context from './components/Context'

export default function App(){

	const [userData, setUserData] = useState("")

return(<>
	<Context.Provider value={userData}>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login setUserData={setUserData}/>}/>
				<Route path="/cadastro" element={<Cadastro/>}/>
				<Route path="habitos" element={<Habitos userData={userData}/>}/>
				<Route path="hoje" element={<Hoje/>}/>
				<Route path="historico" element={<Historico userData={userData}/>}/>
			</Routes>
		</BrowserRouter>
	</Context.Provider>
</>)
}
