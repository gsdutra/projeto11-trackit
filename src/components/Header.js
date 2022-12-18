import styled from 'styled-components'

import TrackIt from '../assets/TrackIt.png'

import {useContext} from 'react'

import Context from '../Contexts/ContextUserData'

export default function name(props){

    const contextObj = useContext(Context);

    return(
    <HeaderStyled data-test="header">
        <img src={TrackIt}/>
        <PfpImage>
            <img src={contextObj.userData.image}/>
        </PfpImage>
    </HeaderStyled>
    )
}

const HeaderStyled = styled.div`
    height: 70px;
    width: 100%;
    background: #126BA5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 18px;
    padding-right: 18px;
    box-sizing: border-box;
`

const PfpImage = styled.div`
    img{
        width: 50px;
        height: auto;
        border-radius: 50%;
    }
`