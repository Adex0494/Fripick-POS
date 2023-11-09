import React from 'react'
import {StyledAutocomplete, StyledTextField, StyledDiv, StyledIconContainer} from './custom-dropdown.styled'

import PropTypes from 'prop-types';

const CustomDropdown = ( {options, color, label, noOptionsText, labelPropName, renderOption, Icon, onChange, value} ) => {
    return <StyledDiv>
        <StyledAutocomplete  
              sx={{
                "& .MuiAutocomplete-popupIndicator": { transform: "none" },
              }}   
            disableClearable
            noOptionsText = {noOptionsText}
            options={options}
            onChange={onChange}
            value={value}
            autoHighlight
            renderOption={renderOption}
            getOptionLabel={(option) => option[labelPropName] ? option['employeeCode'] ?  option[labelPropName] + ' (' + option['employeeCode'] + ')' : option[labelPropName] : ''}
            popupIcon={<StyledIconContainer color={color}>
                    <Icon style={{width: '32px', height: '32px'}}/>
                </StyledIconContainer>}
            renderInput={(params) => (
            <StyledTextField 
            {...params}
            sx={{
                "& .MuiOutlinedInput-root.Mui-focused": {
                  "& > fieldset": {
                    borderColor: color,
                  }
                }
              }}
            label={label}
            InputLabelProps={{
                style: { color: color},
              }}
            inputProps={{
              ...params.inputProps,
              autoComplete: 'off', // disable autocomplete and autofill
            }}
            
            />
            )
            }
        />
    </StyledDiv>
}

CustomDropdown.propTypes = {
    options: PropTypes.array,
    label: PropTypes.string,
    color: PropTypes.string,
    noOptionsText: PropTypes.string,
    labelPropName: PropTypes.string,
    renderOption: PropTypes.any,
    Icon: PropTypes.any,
    onChange: PropTypes.func,
    value: PropTypes.object
}

export default CustomDropdown