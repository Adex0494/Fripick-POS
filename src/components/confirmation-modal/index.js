import React, { useContext, useReducer } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CartTable from '../cart-table';
import { Header, StyledTitle, StyledMoneyText, TableContainer, FlexContainer, SummaryContainer, LeftContainer, DetailContainer, 
  DetailText, PinContainer, StyledTextField, StyledButton, StyledClearIcon, TooltipTitle, ReasonContainer, NumberText, CircularProgressContainer, StyledCircularProgress,
  CashCardSelectorContainer, AmountsContainer 
} from './confirmation-modal.styled'
import { postHttpResponse } from '../../api/helper';
import HtmlTooltip from '../htmlTooltip';
import InfoContainer from '../Info-container';
import CashCardSelector from '../cash-card-selector';
import { paymentMethods, accountTypes } from '../../constants';
import PaymentAmountContainer from '../payment-amount-container';
import amountToFixed from '../../helper/amountToFixed';
import { Context } from '../../store/context';
import PrintReport from '../PrintReport';
import reducer, { initialState, actionTypes } from './reducer';

const style = (isFullSize) => {
  return {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isFullSize ? '100%' : '91%',
    height: isFullSize ? '100%' :'85%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '4px',
    boxShadow: 24,
  }
};


export default function BasicModal({selectedPaymentMethod, setAlert, selectedAccountTypeId, open, setOpen, selectedProducts,
  balance, clearSelectedEmployee}) {
  const {userId, token, itbis, subTotal, companyBranchId, selectedEmployee: employee, toUseBenefits, amountToProcess, cashOrCardValue} = useContext(Context)
  
  const [state, dispatch] = useReducer(reducer, initialState)
  const {pinValue, openPinTooltip, openCashTooltip, openPaymentMethodTooltip, openReasonTooltip, orderReason,
    isLoading, cashOrCardMethod, cashValue, isPrintReport, receiptUrl} = state


  const postOrder = async (body) => {
    dispatch({type: actionTypes.setIsLoading, payload: true})
    try{
        const response = await postHttpResponse('create-order-service/createposorder', body, token, userId)
        console.log(response)
        if (response?.data?.success){
          if (response.data.showReceipt && response.data.downloadReceiptUrl){
            dispatch({type: actionTypes.setReceiptUrl, payload: response.data.downloadReceiptUrl})
            //setAlert({open: true, severity: 'success', message: 'Orden Realizada', duration: 3000})
            clearSelectedEmployee()
          }else{
            clearSelectedEmployee()
            handleClose()
            setAlert({open: true, severity: 'success', message: 'Orden Realizada', duration: 3000})
          }
        }
    }
    catch(error){
        setAlert({open: true, severity: 'error', message: error?.response?.data?.errorMessage || error?.message || 'Ocurrió un error buscando los datos', duration: 3000})
    }
    dispatch({type: actionTypes.setIsLoading, payload: false})
}

  const handleReasonChange = (value) => {
    if (value.length <= 700){
      dispatch({type: actionTypes.setOrderReason, payload: value})
    }
  }

  const handleClose = () => {
    dispatch({type: actionTypes.setPinValue, payload: ''})
    dispatch({type: actionTypes.setOpenPinTooltip, payload: false})
    dispatch({type: actionTypes.setOpenCashTooltip, payload: false})
    dispatch({type: actionTypes.setOpenReasonTooltip, payload: false})
    dispatch({type: actionTypes.setOrderReason, payload: ''})
    dispatch({type: actionTypes.setCashOrCardMethod, payload: undefined})
    dispatch({type: actionTypes.setCashValue, payload: ''})
    setOpen(false);
    dispatch({type: actionTypes.setIsPrintReport, payload: false})
  }

  const handlePinChange = (value)=>{
    if(value.length > 4) return
    dispatch({type: actionTypes.setPinValue, payload: value})
  }

  const handleOpenPinTooltip = () => {
    dispatch({type: actionTypes.setOpenPinTooltip, payload: true})
    setTimeout(()=> dispatch({type: actionTypes.setOpenPinTooltip, payload: false}), 3000)
  }

  const handleOpenCashTooltip = () => {
    dispatch({type: actionTypes.setOpenCashTooltip, payload: true})
    setTimeout(()=> dispatch({type: actionTypes.setOpenCashTooltip, payload: false}), 3000)
  }

  const handleOpenPaymentMethodTooltip = () => {
    dispatch({type: actionTypes.setOpenPaymentMethodTooltip, payload: true})
    setTimeout(()=> dispatch({type: actionTypes.setOpenPaymentMethodTooltip, payload: false}), 3000)
  }

  const handleOpenReasonTooltip = () => {
    dispatch({type: actionTypes.setOpenReasonTooltip, payload: true})
    setTimeout(()=> dispatch({type: actionTypes.setOpenReasonTooltip, payload: false}), 3000)
  }

  const handleConfirm = () => {
    let validation = true
    
    if (pinValue.length < 4){
      handleOpenPinTooltip()
      validation = false
    }

    if (Number(cashOrCardValue.toFixed(2)) && !cashOrCardMethod){
      handleOpenPaymentMethodTooltip()
      validation = false
    }

    if (orderReason.length === 0 && selectedAccountTypeId === accountTypes.company){
      handleOpenReasonTooltip()
      validation = false
    }

    if ( (cashOrCardMethod === paymentMethods.efectivo && Number(cashOrCardValue.toFixed(2)) && (cashValue === '' || parseInt(cashValue) - Number(cashOrCardValue.toFixed(2)) < 0)) 
        || (selectedPaymentMethod === paymentMethods.efectivo && ((cashValue === '' && Number(amountToProcess.toFixed(2))) || parseInt(cashValue) - Number(amountToProcess.toFixed(2)) < 0)) ){
      handleOpenCashTooltip()
      validation = false
    }

    if (!validation) return

    const orderProducts = selectedProducts.map(product => {
      return {
        cashOrCardValue: Number(product.cashOrCardValue.toFixed(2)),
        catalogId: product.catalogId,
        combo: product.combo.toString(),
        deliveryDate: product.deliveryDate,
        deliveryTypeId: product.deliveryTypeId,
        itemId: product.id.toString(),
        orderReason,
        providerId: product.providerId,
        quantity: parseInt(product.quantity),
        sections: product.sections,
        subTotal: product.price,
        userType: product.userType
      }
    })
    const payload = {
      id: employee.id,
      nameUser: employee.name,
      paymentMethod: selectedPaymentMethod,
      pin: pinValue,
      products: orderProducts,
      selectedCompanyBranchId: companyBranchId,
      subPaymentMethod: cashOrCardMethod,
      vendorId: 2829
    }
    postOrder(payload)
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style(isPrintReport)}>
          {isPrintReport && <PrintReport setAlert={setAlert} receiptUrl={receiptUrl} handleClose={handleClose}/>}
          {!isPrintReport &&<FlexContainer>
            <LeftContainer>
              <Header backgroundcolor={selectedAccountTypeId === accountTypes.employee ? '#6ec4e8' : '#ff8d6a'}>
                <StyledTitle>{employee.name}</StyledTitle>
                <StyledMoneyText>{balance}</StyledMoneyText>
              </Header>
              <TableContainer>
                <CartTable selectedProducts={selectedProducts}/>
              </TableContainer>
            </LeftContainer>
            <SummaryContainer>
              <StyledClearIcon onClick={handleClose}/>
                <AmountsContainer>
                  <DetailContainer>
                    <DetailText>
                      Subtotal
                    </DetailText>
                    <DetailText>
                    {`RD $${amountToFixed(subTotal,2)}`}
                    </DetailText>
                  </DetailContainer>

                  {Object.entries(itbis).map(entry =><DetailContainer key={entry[0]}>
                    <DetailText>
                      {entry[0]} 
                    </DetailText>
                    <DetailText>
                      {`RD$ ${amountToFixed(entry[1], 2)}`}
                    </DetailText>
                  </DetailContainer> )}

                  {Object.entries(toUseBenefits).map(entry => <DetailContainer key={entry[0]}>
                    <DetailText textcolor='#6ec4e8'>
                      {entry[0][0].toUpperCase() + entry[0].slice(1)}
                    </DetailText>
                    <DetailText textcolor='#6ec4e8'>
                    {`RD $${amountToFixed(entry[1], 2)}`}
                    </DetailText>
                  </DetailContainer>)}

                  <DetailContainer>
                    <DetailText bold>
                      {selectedPaymentMethod === paymentMethods.nomina && 'Total'}
                      {selectedPaymentMethod === paymentMethods.efectivo && 'Total Efectivo'}
                      {selectedPaymentMethod === paymentMethods.tarjeta && 'Total Tarjeta'}
                    </DetailText>
                    <DetailText bold>
                      {`RD$ ${amountToFixed(amountToProcess,2)}`}
                    </DetailText>
                  </DetailContainer>

                  {Number(cashOrCardValue.toFixed(2)) ? <InfoContainer cashOrCardValue={Number(cashOrCardValue.toFixed(2))}/> : null}
                </AmountsContainer>

              {(Number(cashOrCardValue.toFixed(2)) && selectedPaymentMethod === paymentMethods.nomina) || selectedPaymentMethod === paymentMethods.efectivo ? 
              <CashCardSelectorContainer>
                { Number(cashOrCardValue.toFixed(2)) && selectedPaymentMethod === paymentMethods.nomina ? 
                <CashCardSelector 
                  primaryPaymentMethod={selectedPaymentMethod} 
                  cashValue={cashValue} 
                  setCashValue={(payload)=> dispatch({type: actionTypes.setCashValue, payload})} 
                  openPaymentMethodTooltip={openPaymentMethodTooltip}
                  openCashTooltip={openCashTooltip} 
                  amount={Number(cashOrCardValue.toFixed(2))} 
                  setSecondaryPaymentMethod={(payload)=> dispatch({type: actionTypes.setCashOrCardMethod, payload})} 
                  selectedSecondaryPaymentMethod={cashOrCardMethod}/> : 
                  Number(amountToProcess.toFixed(2)) ? <PaymentAmountContainer 
                    amount={Number(amountToProcess.toFixed(2))}
                    primaryPaymentMethod={selectedPaymentMethod}
                    cashValue={cashValue}
                    setCashValue={(payload)=> dispatch({type: actionTypes.setCashValue, payload})} 
                    opentooltip={openCashTooltip}
                />: null}
              </CashCardSelectorContainer> : null}


              <PinContainer margintop={openPaymentMethodTooltip && 60}>
                <DetailText bold>
                    Digitar Pin
                  </DetailText>
                  <HtmlTooltip arrow open={openPinTooltip} placement='bottom-start' title={<TooltipTitle>Digita el PIN</TooltipTitle>}>
                    <StyledTextField variant="outlined" type='password' value={pinValue} onChange={(e)=>handlePinChange(e.target.value)}
                      inputProps={{
                        style: {fontSize: 24} 
                      }}
                    />
                  </HtmlTooltip>
                  {selectedAccountTypeId === accountTypes.company && <ReasonContainer opentooltip={openPinTooltip}>
                    <DetailText align='left' marginBottom={11} >
                      Razón de Orden*
                    </DetailText>
                    <HtmlTooltip arrow open={openReasonTooltip} placement='bottom-start' title={<TooltipTitle>Especifique la Razón de Orden</TooltipTitle>}>
                      <StyledTextField multiline  minRows={2} maxRows={7} variant="outlined" value={orderReason} onChange={(e)=>handleReasonChange(e.target.value)}
                        inputProps={{
                          style: {fontSize: 18} 
                        }}
                      /> 
                    </HtmlTooltip>
                    <NumberText>
                      {`${orderReason.length} / 700`}
                    </NumberText>
                    </ReasonContainer>}
                  <StyledButton opentooltip={(openPinTooltip && selectedAccountTypeId === accountTypes.employee) || (openReasonTooltip && selectedAccountTypeId === accountTypes.company)} onClick={handleConfirm} variant='contained'>
                    {isLoading ? <CircularProgressContainer><StyledCircularProgress/></CircularProgressContainer> : 'Confirmar'}
                  </StyledButton>
                </PinContainer>
            </SummaryContainer>
          </FlexContainer>}
        </Box>
      </Modal>
    </div>
  );
}