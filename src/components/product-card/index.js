import React from 'react'
import {StyledLabelBox, StyledBackgroundDiv, StyledLabel, StyledTitle, StyledColumn, StyledRow} from './product-card.styled'
import PropTypes from 'prop-types'

const ProductCard = ({rectangleColor, label, title, price, onClickHandler}) => {

    const translateColor = (color) => {
        if (color.toLowerCase() === 'green') return '#80bd01'
        if (color.toLowerCase() === 'orange') return '#ff8d6a'
        if (color.toLowerCase() === 'blue') return "#6ec4e8"
        if (color.toLowerCase() === 'grey') return "#acb4b9"
        return color
    }

    return (
        <StyledLabelBox onClick={onClickHandler}>
            { label && <StyledLabel>{label}</StyledLabel> }
            <StyledRow>
                <StyledBackgroundDiv color={translateColor(rectangleColor)} />
                <StyledColumn>
                    <StyledTitle>
                        {title}
                    </StyledTitle>
                    <StyledTitle>
                        {price}
                    </StyledTitle>
                </StyledColumn>
            </StyledRow>
        </StyledLabelBox>
    )
}

ProductCard.propTypes={
    rectangleColor: PropTypes.string,
    label: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.string,
    onClickHandler: PropTypes.func
}

export default ProductCard