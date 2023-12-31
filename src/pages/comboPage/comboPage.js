import React, {useState, useContext, useReducer} from "react";
import PropTypes from 'prop-types'
import { MainContainer, InnerContainer, Column, StyledInput, Row, StyledTitle, StyledClearIcon,
    StyledSubTitle, StyledRadio, Card, CardTitle, Footer, MainColumn, MaxHeightDiv, FooterColumn, PriceTitle,
    StyledButton, ButtonText, StyledCheckBox } from './comboPage.styled'
import RadioGroup from '@mui/material/RadioGroup';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import { useTheme } from '@mui/material/styles'
import { getHttpResponse } from "../../api/helper";
import amountToFixed from "../../helper/amountToFixed";
import { Context } from '../../store/context';
import reducer, { initialState, actionTypes } from "./reducer";

const ComboPage = ({selectedComboItem, clearComboPage,  addComboToCartHandler, catalogId, setAlert})=> {
    const {userId, token, companyBranchId} = useContext(Context)
    const theme = useTheme();
    const isPriceVariable = isNaN(selectedComboItem.price)

    const [state, dispatch] = useReducer(reducer, initialState)
    const {combo, selectedProductIndexes, comboQuantity, accPrice, hasAdditional} = state

    const httpResponseHelper = async (url)=> {
        const response = await getHttpResponse(url,token, userId)
        return response
    } 

    const getCombo = async () => {
        try{
            const response = await httpResponseHelper(`item-service/combo/${selectedComboItem.id}?catalogId=${catalogId}&companybranchid=${companyBranchId}`)
            dispatch({type: actionTypes.setCombo, payload: response.data})
            const payload = response.data?.sections.map((section) => {if (section.additional){return section.products.map(() => -1)}else return -1})
            dispatch({type: actionTypes.setSelectedProductIndexes, payload})
        }
        catch(error){
            clearComboPage()
            setAlert({open: true, severity: 'error', message: error?.message || 'Ocurrió un error buscando los datos', duration: 3000})
        }
    }

    useState(() => {
        getCombo()
    }, [])

    const addCombo = () => {
        const sections = []

        for (let i=0; i<selectedProductIndexes.length; i++){ //selectedProductIndexes example [1,0,[1,1,-1]]
            const value = selectedProductIndexes[i]
            if (value === -1) continue
            if (value.length){
                for (let j=0; j<value.length; j++){
                    if (value[j] === 1)
                        sections.push(
                            {
                                id: combo.sections[i]?.sectionId?.toString(),
                                variantId: combo.sections[i]?.products[j]?.id?.toString()
                            }
                        )
                }
            }else{
                sections.push(
                    {
                        id: combo.sections[i]?.sectionId?.toString(),
                        variantId: combo.sections[i]?.products[value]?.id?.toString()
                    }
                )
            }
            
        }
        
        addComboToCartHandler({
            ...selectedComboItem,
            selectedProductIndexes,
            quantity: comboQuantity, 
            sections,
            price: (isPriceVariable || hasAdditional) ? amountToFixed(accPrice,2) : selectedComboItem.price
        })
    }
 

    const radioChangeHandler = (value, sectionIndex) => {
        let thisHasAdditional = hasAdditional
        const newState = [...selectedProductIndexes];
        if (combo.sections[sectionIndex].additional){
            if (newState[sectionIndex] === -1){
                const selectedAdditionals = combo.sections[sectionIndex].products.map((product, index) => {if (index === value) {return 1} else return -1}) // The index of the product selected in the additionals section is set to 1, in this array; otherwise, it is set to -1
                newState[sectionIndex] = selectedAdditionals
            }
            else{
                if (newState[sectionIndex][value] === 1) {
                    newState[sectionIndex][value] = -1
                }else{
                    newState[sectionIndex][value] = 1
                }
            }
            if (newState[sectionIndex].some(index => index === 1)) {
                thisHasAdditional = true
                dispatch({type: actionTypes.setHasAdditional, payload: true})
            }else{
                dispatch({type: actionTypes.setHasAdditional, payload: false})
            }
        }else{
            newState[sectionIndex] = value
        }
        
        let payload
        if (isPriceVariable || thisHasAdditional) {
            payload = newState.reduce((acc, current, index) => {
            if(!current.length && !isPriceVariable && !combo.sections[index].products[current]?.additional){ //If price is fixed, total price is fixed price plus additional
                if (acc === 0 || acc === selectedComboItem.price * 1) return selectedComboItem.price * 1
                if (acc < selectedComboItem.price * 1) return acc + selectedComboItem.price * 1
                return acc
            }
            let price = 0
            if (current.length){
                for (let i = 0; i< current.length; i++){
                    const productPrice = current[i] === 1 ? combo.sections[index].products[i].price : 0
                    price += (productPrice ? productPrice * 1 : 0 )
                }
            }else{
            if (current === -1) return acc + 0
             price = combo.sections[index].products[current].price     
            }       
            return acc + (price ? price * 1 : 0 )
            },0)
            dispatch({type: actionTypes.setAccPrice, payload})
        }
        dispatch({type: actionTypes.setSelectedProductIndexes, payload: newState})
    }

    return <MainContainer>
        <InnerContainer>
            {combo && <MainColumn>
                <MaxHeightDiv>
                    <Column>
                        <Row>
                            <Row>
                                <StyledInput sx={{ input: { color: '#696969' } }} value={comboQuantity} disableUnderline type='number' onChange={(e) => e.target.value > 0 && dispatch({type: actionTypes.setComboQuantity, payload: e.target.value}) }/>
                                <StyledTitle>
                                    {selectedComboItem.name}
                                </StyledTitle>
                            </Row>
                        <div>
                            <StyledClearIcon onClick={clearComboPage} />
                        </div>
                        </Row>
                        {
                            combo.sections?.map((section, sectionIndex) => {
                                return <div key={section.sectionId}>
                                        <StyledSubTitle> {section.name} </StyledSubTitle>
                                        <FormControl style={{width: '100%'}}>
                                        <RadioGroup
                                            value={selectedProductIndexes[sectionIndex]}
                                            onChange={() => {}}
                                        >
                                            <Grid container spacing={2}>
                                            {section.products.map((product, productIndex) => <Grid item key={product.id} xs={12} md={3}>
                                                <Card onClick={() => radioChangeHandler(productIndex, sectionIndex)} selected = {selectedProductIndexes[sectionIndex].length ? selectedProductIndexes[sectionIndex][productIndex] === 1 : selectedProductIndexes[sectionIndex] === productIndex} selectedColor = {theme.palette.secondary.main}>
                                                    <CardTitle selected = {selectedProductIndexes[sectionIndex].length ? selectedProductIndexes[sectionIndex][productIndex] === 1 : selectedProductIndexes[sectionIndex] === productIndex}>{`${product.name}${product.price*1 > 0 ? ` (${amountToFixed(product.price*1,2)})` : '' }`}</CardTitle>
                                                        {!selectedProductIndexes[sectionIndex].length && <StyledRadio sx={{
                                                            '&.Mui-checked': {
                                                                color: 'white',
                                                            },
                                                            }} 
                                                            value={productIndex} />}
                                                        {selectedProductIndexes[sectionIndex].length && <StyledCheckBox  checked={selectedProductIndexes[sectionIndex][productIndex]===1} 
                                                            sx={{
                                                                color: 'black',
                                                                '&.Mui-checked': {
                                                                color: 'white',
                                                                },
                                                            }}/>}
                                                </Card>
                                            </Grid>
                                            )}
                                            </Grid>
                                        </RadioGroup>
                                        </FormControl>
                                    </div>
                            })
                        }
                    </Column>
                </MaxHeightDiv>
                <Footer>
                    <FooterColumn>
                        <PriceTitle>{`RD$ ${amountToFixed((isPriceVariable || hasAdditional) ? accPrice === 0 ? selectedComboItem.price * comboQuantity : accPrice * comboQuantity : selectedComboItem.price * comboQuantity, 2)}`}</PriceTitle>
                        <StyledButton  onClick={addCombo} disabled={selectedProductIndexes.filter((value, index) => combo.sections[index].additional === false).some(index => index === -1)} sx={{
                            "&.Mui-disabled": {
                                pointerEvents: "unset", 
                                cursor: "not-allowed"
                            }
                        }}>
                            <ButtonText>Agregar al Carrito</ButtonText>
                        </StyledButton>
                    </FooterColumn>
                </Footer>
            </MainColumn> }
        </InnerContainer>
    </MainContainer>
}

ComboPage.propTypes = {
    selectedComboItem: PropTypes.object.isRequired,
    clearComboPage: PropTypes.func,
    addComboToCartHandler: PropTypes.func,
    setAlert: PropTypes.func,
    catalogId: PropTypes.number.isRequired,
}

export default ComboPage