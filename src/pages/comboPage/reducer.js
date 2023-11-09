export const initialState = {
    combo: undefined,
    selectedProductIndexes: undefined,
    comboQuantity: '1',
    accPrice: 0,
    hasAdditional: false
}

export const actionTypes = {
    setCombo: 'setCombo',
    setSelectedProductIndexes: 'setSelectedProductIndexes',
    setComboQuantity: 'setComboQuantity',
    setAccPrice: 'setAccPrice',
    setHasAdditional: 'setHasAdditional'
}

const reducer = (state, action) => {
    switch(action.type){
        case actionTypes.setCombo:
            return {...state, combo: action.payload}
        case actionTypes.setSelectedProductIndexes:
            return {...state, selectedProductIndexes: action.payload}
        case actionTypes.setComboQuantity:
            return {...state, comboQuantity: action.payload}
        case actionTypes.setAccPrice:
            return {...state, accPrice: action.payload}
        case actionTypes.setHasAdditional:
            return {...state, hasAdditional: action.payload}
        default: return state
    }
}

export default reducer