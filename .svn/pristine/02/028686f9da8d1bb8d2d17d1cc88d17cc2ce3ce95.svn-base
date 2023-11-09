import React from 'react'
import { Container, LetterContainer, LetterTypography } from './alphabet.styled'

const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z']

const Alphabet = ({ selectedLetter, setSelectedLetter }) => {
    return <Container>
        {alphabet.map(letter => <LetterContainer key={letter} selected={selectedLetter === letter} 
            onClick={()=>setSelectedLetter(selectedLetter === letter ? null : letter)}><LetterTypography selected={selectedLetter === letter}>{letter}</LetterTypography></LetterContainer>)}
    </Container>
}

export default Alphabet