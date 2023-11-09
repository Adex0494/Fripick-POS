import React from 'react'

import { Container, Card, CardBody, StyledIconContainer, TextDiv } from './info-card.styled'

const InfoCard = ({Icon, color, text}) => {
    return <Container>
        <Card>
            <CardBody>
                <StyledIconContainer color={color}>
                    <Icon style={{width: '92px', height: '92px'}} />
                </StyledIconContainer>
                <TextDiv>{text}</TextDiv>
            </CardBody>
        </Card>
    </Container>
}

export default InfoCard