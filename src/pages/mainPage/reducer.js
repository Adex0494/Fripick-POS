import { accountTypes, paymentMethods } from "../../constants"

export const initialState = {
    filterProductInputValue: '',
    selectedProducts: [],
    users: [],
    catalogList: [],
    selectedCatalogIndex: 0,
    lastProductsOrdered: [],
    goToComboPage: false,
    selectedComboItem: {},
    selectedCompany: {},
    catalogTypeId: undefined,
    catalogsCurrentDateTime: undefined,
    initialTimeLeft: undefined,
    timeLeft: undefined,
    categories: [],
    categoriesSelected: {},
    alert: {open: false},
    isLoading: false,
    openModal: false,
    selectedLetter: undefined,
    selectedAccountTypeId: accountTypes.employee,
    selectedPaymentMethod: paymentMethods.nomina,
    availableBalanceToday: 0,
    openNotEnoughBalanceMessage: false,
    cartAlert: {function: null, text: null}
}

export const actionTypes = {
    setFilterProductInputValue: 'setFilterProductInputValue',
    setSelectedProducts: 'setSelectedProducts',
    setUsers: 'setUsers',
    setCatalogList: 'setCatalogList',
    setSelectedCatalogIndex: 'setSelectedCatalogIndex',
    setLastProductsOrdered: 'setLastProductsOrdered',
    setGoToComboPage: 'setGoToComboPage',
    setSelectedComboItem: 'setSelectedComboItem',
    setSelectedCompany: 'setSelectedCompany',
    setCatalogTypeId: 'setCatalogTypeId',
    setCatalogsCurrentDateTime: 'setCatalogsCurrentDateTime',
    setInitialTimeLeft: 'setInitialTimeLeft',
    reduceTimeLeft: 'reduceTimeLeft',
    setCategories: 'setCategories',
    setCategoriesSelected: 'setCategoriesSelected',
    setAlert: 'setAlert',
    setIsLoading: 'setIsLoading',
    setOpenModal: 'setOpenModal',
    setSelectedLetter: 'setSelectedLetter',
    setSelectedAccountTypeId: 'setSelectedAccountTypeId',
    setSelectedPaymentMethod: 'setSelectedPaymentMethod',
    setAvailableBalanceToday: 'setAvailableBalanceToday',
    setOpenNotEnoughBalanceMessage: 'setOpenNotEnoughBalanceMessage',
    setCartAlert: 'setCartAlert',
    commonClear: 'commonClear',
    clearCatalog: 'clearCatalog',
    setTimers: 'setTimers'
}

const mainReducer = (state, action) => {
    switch(action.type){
        case actionTypes.setFilterProductInputValue:
            return {...state, filterProductInputValue: action.payload}
        case actionTypes.setSelectedProducts: 
            return {...state, selectedProducts: action.payload}
        case actionTypes.setUsers: 
            return {...state, users: action.payload}
        case actionTypes.setCatalogList: 
            return {...state, catalogList: action.payload}
        case actionTypes.setSelectedCatalogIndex: 
            return {...state, selectedCatalogIndex: action.payload}
        case actionTypes.setLastProductsOrdered: 
            return {...state, lastProductsOrdered: action.payload}
        case actionTypes.setGoToComboPage: 
            return {...state, goToComboPage: action.payload}
        case actionTypes.setSelectedComboItem: 
            return {...state, selectedComboItem: action.payload}
        case actionTypes.setSelectedCompany: 
            return {...state, selectedCompany: action.payload}
        case actionTypes.setCatalogTypeId: 
            return {...state, catalogTypeId: action.payload}
        case actionTypes.setCatalogsCurrentDateTime: 
            return {...state, catalogsCurrentDateTime: action.payload}
        case actionTypes.setInitialTimeLeft: 
            return {...state, initialTimeLeft: action.payload}
        case actionTypes.reduceTimeLeft: 
            return state.timeLeft > 0 ? {...state, timeLeft: state.timeLeft - 1 } : state
        case actionTypes.setCategories: 
            return {...state, categories: action.payload}
        case actionTypes.setCategoriesSelected: 
            return {...state, categoriesSelected: action.payload}
        case actionTypes.setAlert: 
            return {...state, alert: action.payload}
        case actionTypes.setIsLoading: 
            return {...state, isLoading: action.payload}
        case actionTypes.setOpenModal: 
            return {...state, openModal: action.payload}
        case actionTypes.setSelectedLetter: 
            return {...state, selectedLetter: action.payload}
        case actionTypes.setSelectedAccountTypeId: 
            return {...state, selectedAccountTypeId: action.payload}
        case actionTypes.setSelectedPaymentMethod: 
            return {...state, selectedPaymentMethod: action.payload}
        case actionTypes.setAvailableBalanceToday: 
            return {...state, availableBalanceToday: action.payload}
        case actionTypes.setOpenNotEnoughBalanceMessage: 
            return {...state, openNotEnoughBalanceMessage: action.payload}
        case actionTypes.setCartAlert: 
            return {...state, cartAlert: action.payload}
        case actionTypes.commonClear:
            return {...state, catalogList: [], catalogsCurrentDateTime: undefined, initialTimeLeft: undefined, 
                timeLeft: undefined, selectedCatalogIndex: 0, catalogTypeId: undefined, lastProductsOrdered: []}
        case actionTypes.clearCatalog:
            return {...state, catalogList: [], selectedCatalogIndex: 0, catalogTypeId: undefined}
        case actionTypes.setTimers:
            return {...state, timeLeft: action.payload, initialTimeLeft: action.payload}
        default : return state
    }
}

export default mainReducer