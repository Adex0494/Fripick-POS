import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { EmptyStateContainer, CartContainer, StyledEmployeeTitle, StyledEmployeeContainer, StyledEmployeeSubTitle, CartItemsDiv, HeightFillerDiv,
        CartItemContainer, StyledInput, CartItemTitle, CartItemPrice, DeleteIcon, MarginTopDiv, CostContainer, StyledButton,
        ButtonText, ContainerFlex, StyledInfoIcon, EmployeeRowContainer, SubsidyText, TooltipTitle, CenteringFlex, DetailsPrice } from './cart.styled' 
import CreditLimit from '../credit-limit'
import AccountSelector from "../../components/account-selector";
import PaymentMethod from '../payment-method';
import InfoContainer from '../Info-container';
import { accountTypes } from '../../constants';
import HtmlTooltip from '../htmlTooltip';
import AlertContainer from '../alert-container';
import amountToFixed from '../../helper/amountToFixed';
import CartImg from '../../assets/bgShoppingCart.jpg'
import { Context } from '../../store/context';

const Cart = ({benefits, employeeBalance, selectedProducts, editProductQuantity, deleteComboCart, selectedPaymentMethod, handleZeroQuantity,
     setSelectedPaymentMethod, deleteProductCart, buttonText, setOpenModal, selectedAccountTypeId, setSelectedAccountTypeId, openNotEnoughBalanceMessage, cartAlert, handleCloseCartAlert}) => {
    const [showCredit, setShowCredit] = useState(false)
    const {itbis, subTotal, selectedEmployee, toUseBenefits, amountToProcess, cashOrCardValue} = useContext(Context)
    const isCompanyAccount = selectedEmployee?.companyAccount
    const employeeName = selectedEmployee?.name || ''
    const employeeId= selectedEmployee?.employeeCode 

    return  <CartContainer>
                {!employeeName ? <EmptyStateContainer src={CartImg} /> : <>
                    <StyledEmployeeContainer backgroundColor={selectedAccountTypeId ===1 ? '#6ec4e8' : '#ff8d6a'}>
                        <EmployeeRowContainer>
                            <div>
                                <StyledEmployeeTitle>{employeeName}</StyledEmployeeTitle>
                                <StyledEmployeeSubTitle>{employeeId}</StyledEmployeeSubTitle>
                            </div>
                            <ContainerFlex>
                                <StyledEmployeeSubTitle>{employeeBalance}</StyledEmployeeSubTitle>
                                <StyledInfoIcon onClick={() => setShowCredit(!showCredit)}/>
                            </ContainerFlex>
                        </EmployeeRowContainer>
                        {isCompanyAccount && <AccountSelector selectedAccountTypeId={selectedAccountTypeId} setSelectedAccountTypeId={setSelectedAccountTypeId}/>}
                    </StyledEmployeeContainer>
                    {selectedAccountTypeId === accountTypes.employee && <PaymentMethod selectedPaymentMethod={selectedPaymentMethod} setSelectedPaymentMethod={setSelectedPaymentMethod}/>}
                    <CartItemsDiv isEmployeeAccount={selectedAccountTypeId === accountTypes.employee}>
                        { showCredit && <CreditLimit balances={benefits?.benefits || null} close={() => setShowCredit(false)}/> }
                        <HeightFillerDiv>
                            <AlertContainer setVisible={selectedProducts?.length > 0 && cartAlert?.function && cartAlert?.text ? true : false} onAccept={cartAlert.function} onClose={handleCloseCartAlert} changeText={cartAlert.text}/>
                            {selectedProducts.map(product => <CartItemContainer key={product.combo ? product.key : product.id}> 
                                <ContainerFlex>
                                    <StyledInput sx={{ input: { color: '#696969' } }} disableUnderline type='number' value={product.quantity} onBlur={() => handleZeroQuantity()} onChange={(e) => { editProductQuantity(product.combo? product.key : product.id, e.target.value, product.combo)}}/>
                                    <CartItemTitle style={{wordBreak: 'break-word'}}>{product.name}</CartItemTitle>
                                </ContainerFlex>
                                <ContainerFlex>
                                    <CartItemPrice>{`RD$ ${amountToFixed(product.price * product.quantity,2)}`}</CartItemPrice>
                                    <DeleteIcon onClick={() => {product.selectedProductIndexes ? deleteComboCart(product) : deleteProductCart(product.id)}}/> 
                                </ContainerFlex>
                            </CartItemContainer>)}
                        </HeightFillerDiv>
                        {subTotal ? <MarginTopDiv>
                            {cashOrCardValue ? <InfoContainer cashOrCardValue={cashOrCardValue}/> : null}
                            <HtmlTooltip arrow open={openNotEnoughBalanceMessage} placement='top-start' title={<TooltipTitle>No hay suficiente balance</TooltipTitle>}>
                                <CostContainer>
                                    <CartItemTitle>Subtotal</CartItemTitle>
                                    <DetailsPrice>{`RD$ ${amountToFixed(subTotal,2)}`}</DetailsPrice>
                                </CostContainer>
                            </HtmlTooltip>
                            {Object.entries(itbis).map(entry =><CostContainer key={entry[0]}>
                                <CartItemTitle>{entry[0]}</CartItemTitle>
                                <DetailsPrice>{`RD$ ${amountToFixed(entry[1],2)}`}</DetailsPrice>
                            </CostContainer>)}
                            {Object.entries(toUseBenefits).map(entry => <CostContainer key={entry[0]}>
                                <SubsidyText textcolor='#6ec4e8'>{entry[0][0].toUpperCase() + entry[0].slice(1)}</SubsidyText>
                                <SubsidyText textcolor='#6ec4e8'>{`RD$ ${amountToFixed(entry[1],2)}`}</SubsidyText>
                            </CostContainer>)}
                            <StyledButton onClick={() => setOpenModal(true)} variant='contained'>
                                <ButtonText>
                                    {buttonText}
                                </ButtonText>
                                <ButtonText bold>
                                {`RD$ ${amountToFixed(amountToProcess,2)}`}
                                </ButtonText>
                            </StyledButton>
                        </MarginTopDiv> : <CenteringFlex><div><HtmlTooltip open={openNotEnoughBalanceMessage} placement='top' title={<TooltipTitle>No hay suficiente balance</TooltipTitle>}><div style={{marginLeft: '-20px'}}/></HtmlTooltip></div></CenteringFlex>}
                    </CartItemsDiv>
                </>}
            </CartContainer>
}

Cart.propTypes = {
    employeeBalance: PropTypes.string.isRequired,
    selectedProducts: PropTypes.array.isRequired,
    editProductQuantity: PropTypes.func.isRequired,
    handleZeroQuantity: PropTypes.func.isRequired,
    deleteComboCart: PropTypes.func.isRequired,
    deleteProductCart: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired,
    setOpenModal: PropTypes.func,
    openNotEnoughBalanceMessage: PropTypes.bool,
    setSelectedAccountTypeId: PropTypes.func,
    selectedAccountTypeId: PropTypes.number,
    selectedPaymentMethod: PropTypes.string,
    setSelectedPaymentMethod: PropTypes.func,
}

export default Cart