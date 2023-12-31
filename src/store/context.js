import React, { useReducer } from 'react'


// Reducer-------------------------------------------------------------------------------------------------------------------
const initialState = {
    token: undefined,
    userId: undefined,
    providerId: undefined,
    provider: undefined,
    companies: [],
    itbis: {},
    subTotal: 0,
    companyBranchId: undefined,
    selectedEmployee: {},
    benefits: undefined,
    companyAccountBenefits: undefined ,
    toUseBenefits: {},
    amountToProcess: 0,
    cashOrCardValue: 0

}

const actionTypes = {
    authenticate: 'AUTHENTICATE',
    setToken: 'SET_TOKEN',
    setProviderId: 'SET_PROVIDERID',
    clear: 'CLEAR',
    setCompanies: 'SET_COMPANIES',
    setItbis: 'SET_ITBIS',
    setSubTotal: 'SET_SUBTOTAL',
    setCompanyBranchId: 'SET_COMPANYBRANCHID',
    setSelectedEmployee: 'SET_SELECTEDEMPLOYEE',
    setBenefits: 'SET_BENEFITS',
    setCompayAccountBenefits: 'SET_COMPANYACCOUNTBENEFITS',
    setToUseBenefits: 'SET_TOUSEBENEFITS',
    setAmountToProcess: `SET_AMOUNTTOPROCESS`,
    setCashOrCardValue: 'SET_CASHORCARDVALUE'
    
}

const reducer = (state, action) => {
    if (action.type === actionTypes.authenticate){
        return {...state, token: action.payload.token, userId: action.payload.userId, providerId: action.payload.providerId}
    }

    if (action.type === actionTypes.setToken){
        return {...state, token: action.payload}
    }

    if (action.type === actionTypes.clear){
        return initialState
    }

    if (action.type === actionTypes.setCompanies){
        return {...state, companies: action.payload}
    }

    if (action.type === actionTypes.setItbis){
        return {...state, itbis: action.payload}
    }

    if (action.type === actionTypes.setSubTotal){
        return {...state, subTotal: action.payload}
    }

    if (action.type === actionTypes.setCompanyBranchId){
        return {...state, companyBranchId: action.payload}
    }

    if (action.type === actionTypes.setSelectedEmployee){
        return {...state, selectedEmployee: action.payload}
    }

    if (action.type === actionTypes.setBenefits){
        return {...state, benefits: action.payload}
    }

    if (action.type === actionTypes.setCompayAccountBenefits){
        return {...state, companyAccountBenefits: action.payload}
    }

    if (action.type === actionTypes.setToUseBenefits){
        return {...state, toUseBenefits: action.payload}
    }

    if (action.type === actionTypes.setAmountToProcess){
        return {...state, amountToProcess: action.payload}
    }

    if (action.type === actionTypes.setCashOrCardValue){
        return {...state, cashOrCardValue: action.payload}
    }

    return state
}


// Context ----------------------------------------------------------------------
export const Context = React.createContext(initialState)


const ContextProvider = props => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const authenticate = (body) => {
        dispatch({type: actionTypes.authenticate, payload: body})
    }

    const setCompanies = (payload) => {
        dispatch({type: actionTypes.setCompanies, payload})
    }

    const setItbis = (payload) => {
        dispatch({type: actionTypes.setItbis, payload})
    }

    const setSubTotal = (payload) => {
        dispatch({type: actionTypes.setSubTotal, payload})
    }

    const setCompanyBranchId = (payload) => {
        dispatch({type: actionTypes.setCompanyBranchId, payload})
    }

    const setSelectedEmployee = (payload) => {
        dispatch({type: actionTypes.setSelectedEmployee, payload})
    }

    const setBenefits = (payload) => {
        dispatch({type: actionTypes.setBenefits, payload})
    }

    const setCompanyAccountBenefits = (payload) => {
        dispatch({type: actionTypes.setCompayAccountBenefits, payload})
    }

    const setToUseBenefits = (payload) => {
        dispatch({type: actionTypes.setToUseBenefits, payload})
    }

    const setAmountToProcess = (payload) => {
        dispatch({type: actionTypes.setAmountToProcess, payload})
    }

    const setCashOrCardValue = (payload) => {
        dispatch({type: actionTypes.setCashOrCardValue, payload})
    }

    return (
        <Context.Provider value={{
                token: state.token, 
                userId: state.userId, 
                providerId: state.providerId,
                authenticate,
                companies: state.companies,
                setCompanies,
                itbis: state.itbis,
                setItbis,
                subTotal: state.subTotal,
                setSubTotal,
                companyBranchId: state.companyBranchId,
                setCompanyBranchId,
                selectedEmployee: state.selectedEmployee,
                setSelectedEmployee,
                benefits: state.benefits,
                setBenefits,
                companyAccountBenefits: state.companyAccountBenefits,
                setCompanyAccountBenefits,
                toUseBenefits: state.toUseBenefits,
                setToUseBenefits,
                amountToProcess: state.amountToProcess,
                setAmountToProcess,
                cashOrCardValue: state.cashOrCardValue,
                setCashOrCardValue
            }} >
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider