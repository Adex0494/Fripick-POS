import React from 'react'
import { Container, TextContainer } from './catalog-list.styled'

const CatalogList = ({catalogNameList, selectedCatalogIndex, setSelectedCatalogIndex}) => {
    return <Container>
        {catalogNameList.map((catalogName, index) =><TextContainer key={catalogName} selected={index === selectedCatalogIndex} onClick={() => setSelectedCatalogIndex(index)}>{catalogName}</TextContainer>)}
        
    </Container>
}

export default CatalogList