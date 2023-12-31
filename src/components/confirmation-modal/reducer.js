export const initialState = {
    pinValue: '',
    openPinTooltip: false,
    openCashTooltip: false,
    openPaymentMethodTooltip: false,
    openReasonTooltip: false,
    orderReason: '',
    isLoading: false,
    cashOrCardMethod: undefined,
    cashValue: '',
    isPrintReport: false,
    receiptUrl: ''
  }
  
 export const actionTypes = {
    setPinValue: 'setPinValue',
    setOpenPinTooltip: 'setOpenPinTooltip',
    setOpenCashTooltip: 'setOpenCashTooltip',
    setOpenPaymentMethodTooltip: 'setOpenPaymentMethodTooltip',
    setOpenReasonTooltip: 'setOpenReasonTooltip',
    setOrderReason: 'setOrderReason',
    setIsLoading: 'setIsLoading',
    setCashOrCardMethod: 'setCashOrCardMethod',
    setCashValue: 'setCashValue',
    setIsPrintReport: 'setIsPrintReport',
    setReceiptUrl: 'setReceiptUrl'
  }
  
  const reducer = (state, action) => {
    switch(action.type){
      case actionTypes.setPinValue:
        return {...state, pinValue: action.payload}
      case actionTypes.setOpenPinTooltip:
        return {...state, openPinTooltip: action.payload}
      case actionTypes.setOpenCashTooltip:
        return {...state, openCashTooltip: action.payload}
      case actionTypes.setOpenPaymentMethodTooltip:
        return {...state, openPaymentMethodTooltip: action.payload}
      case actionTypes.setOpenReasonTooltip:
        return {...state, openReasonTooltip: action.payload}
      case actionTypes.setOrderReason:
        return {...state, orderReason: action.payload}
      case actionTypes.setIsLoading:
        return {...state, isLoading: action.payload}
      case actionTypes.setCashOrCardMethod:
        return {...state, cashOrCardMethod:action.payload}
      case actionTypes.setCashValue:
        return {...state, cashValue: action.payload}
      case actionTypes.setIsPrintReport:
        return {...state, isPrintReport: action.payload}
       case actionTypes.setReceiptUrl:
        return {...state, isPrintReport: true, receiptUrl: action.payload} 
      default: return state
    }
  }

  export default reducer