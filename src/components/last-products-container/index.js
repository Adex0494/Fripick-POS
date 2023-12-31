import React from 'react'
import PropTypes from 'prop-types'
import { Container, LastProductsLabel, SpaceAroundContainer, LastProductCard, StyledTitle, StyledTitleLight, IconContainer, StyledDescriptionIcon, BootstrapTooltip, StyledLabel } from './last-products-container.styled'
import amountToFixed from '../../helper/amountToFixed'
const LastProductsContainer = ({color, label, lastProducts, productSelectedHandler, comboSelectedHandler}) => {
    return <Container borderColor={color}>
                <LastProductsLabel backgroundColor={color}>
                    {label}
                </LastProductsLabel>
                <SpaceAroundContainer spaceAround={lastProducts?.length <= 4}>
                    { lastProducts.map( (product) => <LastProductCard onClick={() => product.combo? comboSelectedHandler(product) : productSelectedHandler(product)} key={product.id}>
                        <BootstrapTooltip title={product.catalogName} placement="top">
                            <IconContainer>
                                <StyledDescriptionIcon color={color}/>
                            </IconContainer>
                        </BootstrapTooltip>
                        {product.combo &&<StyledLabel>Combo</StyledLabel>}
                        <StyledTitle>{product.name}</StyledTitle>
                        <StyledTitleLight>{`RD$ ${amountToFixed(product.price, 2) || product.price}`}</StyledTitleLight>
                </LastProductCard>) }
            </SpaceAroundContainer>
        </Container>
}

LastProductsContainer.propTypes={
    color: PropTypes.string,
    label: PropTypes.string,
    lastProducts: PropTypes.array,
    productSelectedHandler: PropTypes.func
}

export default LastProductsContainer
