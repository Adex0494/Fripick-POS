import React from 'react'
import PropTypes from 'prop-types'
import { StyledLabelBox, StyledBoxFlex, StyledBackgroundDiv, StyledDivCentering, StyledLabel } from './filter-button.styled'

const FilterButton = ({selected, color, onClickHandler, label }) => {
    const translateColor = (color) => {
        if (color.toLowerCase() === 'green') return '#80bd01'
        if (color.toLowerCase() === 'orange') return '#ff8d6a'
        if (color.toLowerCase() === 'blue') return "#6ec4e8"
        if (color.toLowerCase() === 'grey') return "#acb4b9"
        return color
    }


    return <StyledLabelBox selected={selected} color={translateColor(color)} onClick={() => onClickHandler(label)}>
            <StyledBoxFlex>
                <StyledBackgroundDiv color={translateColor(color)}/>
                <StyledDivCentering>
                    <StyledLabel> {label} </StyledLabel>
                </StyledDivCentering>
            </StyledBoxFlex>
        </StyledLabelBox>
}

FilterButton.prototypes = {
    selected: PropTypes.bool,
    color: PropTypes.string,
    onClickHandler: PropTypes.func,
    label: PropTypes.string
}

export default FilterButton