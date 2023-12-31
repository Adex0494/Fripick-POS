import React, { useEffect, useReducer, useContext} from 'react'
import { useTheme } from '@mui/material/styles'
import { getHttpResponse } from '../../api/helper';
import { paymentMethods, accountTypes } from '../../constants';
import { Context } from '../../store/context';

import MainPageBody from './mainPageBody';

import mainReducer, { actionTypes, initialState } from './reducer';


  const MainPage = ({resetAuthentication}) => {
    const {providerId, userId, token, companies, setCompanies, setItbis, setSubTotal, setCompanyBranchId,
         selectedEmployee, setSelectedEmployee, benefits, setBenefits, companyAccountBenefits, setCompanyAccountBenefits, setToUseBenefits,
         setAmountToProcess, setCashOrCardValue} = useContext(Context)

    const [state, dispatch] = useReducer(mainReducer, initialState)

    const {filterProductInputValue, selectedProducts, users, catalogList, selectedCatalogIndex, lastProductsOrdered, goToComboPage, selectedComboItem,
        selectedCompany, catalogTypeId, catalogsCurrentDateTime, initialTimeLeft, timeLeft, categories, categoriesSelected,alert, isLoading, openModal,
        selectedLetter, selectedAccountTypeId, selectedPaymentMethod, availableBalanceToday, openNotEnoughBalanceMessage, cartAlert} = state
    
    const theme = useTheme();

    const setAlert = (payload)=> {
        dispatch({type: actionTypes.setAlert, payload})
    }

    const setOpenModal = (payload)=> {
        dispatch({type: actionTypes.setOpenModal, payload})
    }

    // --------------------Logic to set timer and and update it ---------------------------


    useEffect(() => {
        if (catalogsCurrentDateTime && catalogList[selectedCatalogIndex]?.dateTimeClose) {
            const secondsDifference = Math.floor((new Date(catalogList[selectedCatalogIndex].dateTimeClose) - new Date(catalogsCurrentDateTime)) / 1000)

            if (secondsDifference > 0) {
                dispatch({type: actionTypes.setTimers, payload: secondsDifference})
            }
        }
      
      }, [catalogsCurrentDateTime, selectedCatalogIndex, catalogList]);

      useEffect(() => {
        let interval
        if (initialTimeLeft){
            function substractSecond () {
                dispatch({type: actionTypes.reduceTimeLeft})
            }
           interval = setInterval(substractSecond, 1000);
        }
        return () => clearInterval(interval);
      }, [initialTimeLeft])

      useEffect(()=>{
        if (timeLeft === 0)
            dispatch({type: actionTypes.clearCatalog})
      }, [timeLeft])

      //Set available balance
      useEffect(() => {
        const thisBenefits = selectedAccountTypeId === accountTypes.employee ? benefits : selectedAccountTypeId === accountTypes.company ? companyAccountBenefits : null
        const balancesFound = thisBenefits?.benefits?.find(benefit => benefit.id === 1)?.balances 
        const thisAvailableBalanceToday = (balancesFound?.find(balance => balance.name === 'Balance Diario Disponible') || balancesFound?.find(balance => balance.name === 'Balance Disponible'))?.amount || 0
        dispatch({type: actionTypes.setAvailableBalanceToday, payload: thisAvailableBalanceToday})
    },
        [benefits, selectedAccountTypeId])

    const secondsToTimeString = (totalSeconds) => {
        if (totalSeconds <= 0 || isNaN(totalSeconds)) {
            return '00:00:00'
        }
        let hours = Math.floor(totalSeconds/3600)
        let minutes = Math.floor((totalSeconds - (hours * 3600)) / 60 ) 
        let seconds = totalSeconds - hours * 3600 - minutes * 60

        hours = hours < 10 ? `0${hours}` : hours
        minutes = minutes < 10 ? `0${minutes}` : minutes
        seconds = seconds < 10 ? `0${seconds}` : seconds

        return `${hours}:${minutes}:${seconds}`
    }



// ---------------------------- http requests -----------------------------------------------
    const defaultErrorMessage = 'Ocurrió un error buscando los datos'
    const defaultAlertDuration = 3000

    const httpResponseHelper = async (url)=> {
        const response = await getHttpResponse(url,token, userId)
        return response
    } 

    const fetchUsers = async (companyId) => {
        dispatch({type: actionTypes.setIsLoading, payload: true})
        try{
            const response = await httpResponseHelper(`company-service/company/${companyId}/users`)
           dispatch({type: actionTypes.setUsers, payload: response.data.users})
        }
        catch(error){
            dispatch({type: actionTypes.setAlert, payload:{open: true, severity: 'error', message: error?.message || defaultErrorMessage, duration: defaultAlertDuration}})
        }
        dispatch({type: actionTypes.setIsLoading, payload: false})
    }

    const fetchCategories = async (providerId) => {
        dispatch({type: actionTypes.setIsLoading, payload: true})
        try{
            const response = await httpResponseHelper(`category-service/provider/${providerId}/categories`)
            dispatch({type: actionTypes.setCategories, payload: response.data})
            const categoriesSelectedObj = {}
            response.data.forEach(category => categoriesSelectedObj[category.name] = false)
            dispatch({type: actionTypes.setCategoriesSelected, payload: categoriesSelectedObj})
        }
        catch(error){
            dispatch({type: actionTypes.setAlert, payload:{open: true, severity: 'error', message: error?.message || defaultErrorMessage, duration: defaultAlertDuration}})
        }
        dispatch({type: actionTypes.setIsLoading, payload: false})

    }


    const fetchCompaniesAndUsers = async (providerId) => {
        dispatch({type: actionTypes.setIsLoading, payload: true})
        try{
            const response = await httpResponseHelper(`company-service/provider/${providerId}/companies`)
            setCompanies(response.data)
            const selectedCompany = response.data[0]
            dispatch({type: actionTypes.setSelectedCompany, payload: selectedCompany})
            fetchUsers(selectedCompany.companyId)
            }
        catch(error){
            dispatch({type: actionTypes.setAlert, payload:{open: true, severity: 'error', message: error?.message || defaultErrorMessage, duration: defaultAlertDuration}})
            resetAuthentication()
        }
        dispatch({type: actionTypes.setIsLoading, payload: false})
    }

    const fetchCatalogByUserId = async (userId, providerId) => {
        dispatch({type: actionTypes.setIsLoading, payload: true})
        try{
            const companyBranchresponse = await httpResponseHelper(`company-service/users/${userId}/company-branch`)
            setCompanyBranchId(companyBranchresponse.data.companyBranchId)
            const catalogResponse = await httpResponseHelper(`catalogPosService/provider/${providerId}/catalogs?companybranchid=${companyBranchresponse.data.companyBranchId}`)
            const catalogData = catalogResponse.data.catalogs
            if (catalogData.length === 0){
                dispatch({type: actionTypes.setCatalogList, payload: []})
                dispatch({type: actionTypes.setCatalogTypeId, payload: undefined})
                dispatch({type: actionTypes.setCatalogsCurrentDateTime, payload: undefined})
            }
            else{
                dispatch({type: actionTypes.setCatalogList, payload: catalogData})
                dispatch({type: actionTypes.setCatalogsCurrentDateTime, payload: catalogResponse.data.currentDateTime})
                dispatch({type: actionTypes.setSelectedCatalogIndex, payload: 0})
                dispatch({type: actionTypes.setCatalogTypeId, payload: catalogData[0].catalogTypeId})
            }
        }
        catch(error){
            dispatch({type: actionTypes.setAlert, payload:{open: true, severity: 'error', message: error?.message || defaultErrorMessage, duration: defaultAlertDuration}})
        }
        dispatch({type: actionTypes.setIsLoading, payload: false})
    }

    const fetchUserBenefits = async (userId, catalogTypeId) => {
        try{
            const response = await httpResponseHelper(`benefitservice/user/${userId}/benefits?catalogTypeId=${catalogTypeId}&accountTypeId=1`)
            setBenefits(response.data)
        }
        catch(error){
            dispatch({type: actionTypes.setAlert, payload:{open: true, severity: 'error', message: error?.message || defaultErrorMessage, duration: defaultAlertDuration}})
        }
    }

    const fetchCompanyAccountBenefits = async (userId, catalogTypeId) => {
        try{
            const response = await httpResponseHelper(`benefitservice/user/${userId}/benefits?catalogTypeId=${catalogTypeId}&accountTypeId=2`)
            setCompanyAccountBenefits(response.data)
        }
        catch(error){
            dispatch({type: actionTypes.setAlert, payload:{open: true, severity: 'error', message: error?.message || defaultErrorMessage, duration: defaultAlertDuration}})
        }
    }

    const fetchLatestItems = async ( userId, providerId ) => {
        try{
            const response = await httpResponseHelper(`catalogPosService/provider/${providerId}/latest-items?userId=${userId}`)
            dispatch({type: actionTypes.setLastProductsOrdered, payload: response.data})
        }
        catch(error){
            dispatch({type: actionTypes.setAlert, payload:{open: true, severity: 'error', message: error?.message || defaultErrorMessage, duration: defaultAlertDuration}})
        }
    }


    useEffect(() =>{
        fetchCompaniesAndUsers(providerId)
        fetchCategories(providerId)
    }, [])

    useEffect(() => {
        if(selectedEmployee.id && catalogTypeId){
            fetchUserBenefits(selectedEmployee.id, catalogTypeId)
            if (selectedEmployee.companyAccount) {
                fetchCompanyAccountBenefits(selectedEmployee.id, catalogTypeId)
            }
        }
        else setBenefits()
    },[selectedEmployee.id, catalogTypeId])

    
// ---------------------------- Functions ------------------------------------------------------

    const setFilterProductInputValueHandler = (value) => {
        console.log(value)
        dispatch({type: actionTypes.setSelectedLetter, payload: null})
        dispatch({type: actionTypes.setFilterProductInputValue, payload: value})
    }

    const setSelectedLetterHandler = (letter) => {
        dispatch({type: actionTypes.setFilterProductInputValue, payload: ''})
        dispatch({type: actionTypes.setSelectedLetter, payload: letter})
    }

    const toggleCategory = (categoryName) => {
        
        const previousCategoriesSelectedCopy = {...categoriesSelected}
        previousCategoriesSelectedCopy[categoryName] = !previousCategoriesSelectedCopy[categoryName]
        dispatch({type: actionTypes.setCategoriesSelected, payload: previousCategoriesSelectedCopy})
    }

    const changeCatalogIndexHandler = (index) => {
        dispatch({type: actionTypes.setSelectedCatalogIndex, payload: index})
        dispatch({type: actionTypes.setCatalogTypeId, payload: catalogList[index].catalogTypeId})
    }

    const notEnoughBalanceHandler = () => {
        dispatch({type: actionTypes.setOpenNotEnoughBalanceMessage, payload: true})
        setTimeout(() => dispatch({type: actionTypes.setOpenNotEnoughBalanceMessage, payload: false}), 3000)
      }

    // Calculate benefits to use and whether it is possible to have current selected products (split calculation)
    const benefitsCalculation = (thisSelectedProducts) => {
        const newTaxes = {}

        let newSubtotal = 0
        let canHaveProducts = true
        let thisAmountToProcess = 0
        let totalCashOrCardValue = 0 //total cash or card value when payment method is nomina
        let availableBalanceRemaining = availableBalanceToday

        const benefitsOrder = (selectedAccountTypeId === accountTypes.employee ? benefits : selectedAccountTypeId === accountTypes.company ? companyAccountBenefits : null)?.benefitsOrder?.filter(benefit => benefit.benefitType !== 'limiteDeCredito').sort((a,b) => a.order - b.order)
        const thisToUseBenefits = {}
        let currentBenefitsOrderIndex = 0

        thisSelectedProducts.forEach(product => {
            const currentProductSubtotal = product.price * product.quantity
            newSubtotal += currentProductSubtotal // set subtotal
            let accItbis = 0
            let currentProductItbis = 0

            if(product.taxTypes[0] * 1){ //logic to set taxes
                accItbis = newTaxes[`ITBIS (${product.taxTypes[0] * 1}%)`] || 0
                currentProductItbis = product.price * (product.taxTypes[0] || 0) * product.quantity/100
                accItbis += currentProductItbis
                newTaxes[`ITBIS (${product.taxTypes[0] * 1}%)`] = accItbis // set taxes
            }


            // Determine all benefits to use in each product and in total 
            let thisCurrentProductBenefits = 0
            let currentProductTotalRemaining = currentProductSubtotal + currentProductItbis
            if(benefitsOrder){

                for(let i = currentBenefitsOrderIndex; i < benefitsOrder.length; i++){
                    const currentBenefitOrder = benefitsOrder[i]

                    const currentBenefitOrderAmount = currentBenefitOrder.benefitType === 'subsidio' ? (currentBenefitOrder.subsidyDetail[0]?.amount || 0) : currentBenefitOrder.amount
                    if (!thisToUseBenefits[currentBenefitOrder.benefitType]) thisToUseBenefits[currentBenefitOrder.benefitType] = 0
                    const currentAvailableBenefitAmount = currentBenefitOrderAmount - (thisToUseBenefits[currentBenefitOrder.benefitType])

                    
                    if(currentAvailableBenefitAmount >= currentProductTotalRemaining){
                        thisCurrentProductBenefits += currentProductTotalRemaining
                        thisToUseBenefits[currentBenefitOrder.benefitType] += currentProductTotalRemaining
                        currentProductTotalRemaining = 0
                        break
                    }
 
                    if (currentAvailableBenefitAmount < currentProductTotalRemaining){
                        thisCurrentProductBenefits += currentAvailableBenefitAmount
                        thisToUseBenefits[currentBenefitOrder.benefitType] += currentAvailableBenefitAmount
                        currentProductTotalRemaining -= currentAvailableBenefitAmount 
                        currentBenefitsOrderIndex ++
                    }

                }
            }
            
            
            product.benefits = thisCurrentProductBenefits

            let currentProductAmountToProcess
            const employeeAndNominaCondition = selectedAccountTypeId === accountTypes.employee && selectedPaymentMethod === paymentMethods.nomina
            const thisIsCompanyAccount = selectedAccountTypeId === accountTypes.company

            if (thisIsCompanyAccount && currentProductTotalRemaining > availableBalanceRemaining){ //Return false if there is not enough balance in the company account
                canHaveProducts = false
                return
            }

            if (thisIsCompanyAccount || employeeAndNominaCondition){
                currentProductAmountToProcess = currentProductTotalRemaining <= availableBalanceRemaining ? currentProductTotalRemaining : availableBalanceRemaining
                thisAmountToProcess += currentProductAmountToProcess
                availableBalanceRemaining -= currentProductAmountToProcess
            }

            if (employeeAndNominaCondition){ // set cash or card value in product if payment method is nomina and it's an employee account
                
                product.cashOrCardValue = currentProductTotalRemaining - currentProductAmountToProcess
                totalCashOrCardValue += product.cashOrCardValue
            
            }else{

                if (selectedAccountTypeId === accountTypes.employee && (selectedPaymentMethod === paymentMethods.efectivo || selectedPaymentMethod === paymentMethods.tarjeta)){
                    product.cashOrCardValue = currentProductTotalRemaining
                    thisAmountToProcess += currentProductTotalRemaining
                }
                
            }
            
        })

        if (canHaveProducts){
            
            setSubTotal(newSubtotal)
            setItbis(newTaxes)
            setToUseBenefits(thisToUseBenefits)
            setCashOrCardValue(totalCashOrCardValue)
            setAmountToProcess(thisAmountToProcess)
        }else{
            notEnoughBalanceHandler()
        }
        return {
            canHaveProducts,
        }
    }

    const addProductToCart = (product) => {
        
        const selectedProductsCopy = selectedProducts.map(prod => {return {...prod}})
        const foundProductIndex = selectedProductsCopy.findIndex(prod => prod.id === product.id)
        
        if (foundProductIndex >= 0) {
            const foundProductCopy = {...selectedProductsCopy[foundProductIndex]}
            foundProductCopy.quantity++
            selectedProductsCopy[foundProductIndex] = foundProductCopy
        }else{
            product.quantity = 1
            product.cashOrCardValue = 0
            product.deliveryDate = catalogList[selectedCatalogIndex].deliveryDate
            product.deliveryTypeId = catalogList[selectedCatalogIndex].deliveryTypes[0].id
            product.orderReason = ''
            product.providerId = providerId
            product.sections = []
            product.userType = selectedAccountTypeId
            selectedProductsCopy.push(product)
        }

        const calculation = benefitsCalculation(selectedProductsCopy)
        if(calculation.canHaveProducts){
            dispatch({type: actionTypes.setSelectedProducts, payload: selectedProductsCopy})
        }
    }

    const editProductQuantity = (productId, quantity, isCombo) => {
        if (quantity < 0) return
            const selectedProductsCopy = selectedProducts.map(prod => {return {...prod}})
            const foundProductIndex = selectedProductsCopy.findIndex(prod => isCombo ? prod.key === productId : prod.id === productId)
            const foundProductCopy = {...selectedProductsCopy[foundProductIndex]}
            foundProductCopy.quantity = quantity
            selectedProductsCopy[foundProductIndex] = foundProductCopy

            const calculation = benefitsCalculation(selectedProductsCopy)
            if(calculation.canHaveProducts){
                dispatch({type: actionTypes.setSelectedProducts, payload: selectedProductsCopy}) 
            }
    }

    const handleZeroQuantity = () => {
        if (selectedProducts.some(product => product.quantity < 1)){
            const selectedProductsCopy = selectedProducts.map(prod => {return {...prod, quantity: prod.quantity < 1 ? '1' : prod.quantity}})
            const calculation = benefitsCalculation(selectedProductsCopy)
            if(calculation.canHaveProducts){
                dispatch({type: actionTypes.setSelectedProducts, payload: selectedProductsCopy})
            }
        }
    }

    const deleteProductCart = (productId) => {
        const selectedProductsFilter = selectedProducts.map(prod => {return {...prod}}).filter(product => product.id !== productId) //copying and filtering
        const calculation = benefitsCalculation(selectedProductsFilter)
        if(calculation.canHaveProducts){
            dispatch({type: actionTypes.setSelectedProducts, payload: selectedProductsFilter}) 
        }
    }

    const deleteComboCart = (combo) => {
        const selectedProductsFilter = selectedProducts.map(prod => {return {...prod}}).filter(product => { //copying and filtering
            if(!product.selectedProductIndexes) return true
            if(combo.id !== product.id) return true
            if(combo.selectedProductIndexes === product.selectedProductIndexes) return false
            return true
        }) 

        const calculation = benefitsCalculation(selectedProductsFilter)
        if(calculation.canHaveProducts){
            dispatch({type: actionTypes.setSelectedProducts, payload: selectedProductsFilter}) 
        }
    }

    const comboSelectedHandler = (comboItem) => {
        dispatch({type: actionTypes.setGoToComboPage, payload: true})
        dispatch({type: actionTypes.setSelectedComboItem, payload: comboItem})
    }


    const clearComboPage = () =>{
        dispatch({type: actionTypes.setGoToComboPage, payload: false})
    }

    
    const addComboToCart = (combo) => {  
        const selectedProductsCopy = selectedProducts.map(prod => {return {...prod}})
        let foundSameCombo = false
        const foundCombos = selectedProductsCopy.filter(thisCombo => combo.id === thisCombo.id)
        let foundCombo
        if (foundCombos.length > 0){
            for (let i=0; i<foundCombos.length; i++) 
            {
                foundCombo = foundCombos[i]
                if (foundCombo.sections?.length === combo.sections?.length){
                    foundSameCombo = true
                    foundCombo.sections.forEach(section => {
                        const sameSections = combo.sections.filter(thisSection => thisSection.id === section.id)
                        if (sameSections.length === 0){
                            foundSameCombo = false
                            return
                        }else if(!sameSections.some(sameSection => sameSection.variantId === section.variantId)){
                            foundSameCombo = false
                            return
                        }
                    })
                    if (foundSameCombo) break
                }

            }

            if (foundSameCombo === true){
                foundCombo.quantity++
            }
        }

        if (!foundSameCombo) {
            combo.cashOrCardValue = 0
            combo.deliveryDate = catalogList[selectedCatalogIndex].deliveryDate
            combo.deliveryTypeId = catalogList[selectedCatalogIndex].deliveryTypes[0].id
            combo.orderReason = ''
            combo.providerId = providerId
            combo.userType = selectedAccountTypeId
            combo.key = Date.now()

            selectedProductsCopy.push(combo)
        }

        const calculation = benefitsCalculation(selectedProductsCopy)
        if(calculation.canHaveProducts){
            dispatch({type: actionTypes.setSelectedProducts, payload: selectedProductsCopy}) 
        }
    }

    const addComboToCartHandler =(combo) => {
        addComboToCart(combo)
        dispatch({type: actionTypes.setGoToComboPage, payload: false})
    }

    const clearCart = () => {
        dispatch({type: actionTypes.setSelectedProducts, payload: []}) 
        setSubTotal(0)
        setItbis({})
    }

    const commonClear = () => {
        clearCart()
        dispatch({type: actionTypes.commonClear})
    }

    const clearSelectedEmployee = () => {
        commonClear()
        setSelectedEmployee({})
    }

    const changeCompanyHandler = (newValue) => {
        dispatch({type: actionTypes.setSelectedCompany, payload: newValue})
        commonClear()
        setSelectedEmployee({})
        dispatch({type: actionTypes.setUsers, payload: []})
        fetchUsers(newValue.companyId)
    }

    const changeEmployeeHandler = (newValue) => {
        commonClear()
        setSelectedEmployee(newValue)
        fetchCatalogByUserId(newValue.id, providerId)
        fetchLatestItems(newValue.id, providerId)
    }
    
      const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        dispatch({type: actionTypes.setAlert, payload: {open: false}})
      };

      const handleCloseCartAlert = () => {
        dispatch({type: actionTypes.setCartAlert, payload: {function: null, text: null}})
      }

      const changeAccountTypeHandler = (id) => {
        const theFunction = () => {
            if(id === accountTypes.company){
                dispatch({type: actionTypes.setSelectedPaymentMethod, payload: paymentMethods.nomina})
            }
            dispatch({type: actionTypes.setSelectedAccountTypeId, payload: id})
        }

            if (!selectedProducts || selectedProducts.length === 0) theFunction()
            else dispatch({type: actionTypes.setCartAlert, payload: {function: () => {theFunction(); dispatch({type: actionTypes.setCartAlert, payload: {function: null, text: null}}); clearCart()},
                text: id === accountTypes.company ? 'Cuenta Empresa' : 'Nómina'
            }})
      }

      const changePaymentMethodHandler = (value) => {
        const theFunction = () => {
            dispatch({type: actionTypes.setSelectedPaymentMethod, payload: value})
        }

        if (!selectedProducts || selectedProducts.length === 0) theFunction()
        else dispatch({type: actionTypes.setCartAlert, payload: {function: () => {theFunction(); dispatch({type: actionTypes.setCartAlert, payload: {function: null, text: null}}); clearCart()},
            text: value === paymentMethods.nomina ? 'Nómina' : value === paymentMethods.efectivo ? 'Efectivo' : 'Tarjeta'
        }})
      }

  
        return <MainPageBody filterProductInputValue={filterProductInputValue} selectedProducts={selectedProducts}
                companies={companies} users={users} lastProductsOrdered={lastProductsOrdered} theme={theme} goToComboPage={goToComboPage} selectedComboItem={selectedComboItem}
                selectedCompany={selectedCompany} addProductToCart={addProductToCart} 
                deleteComboCart={deleteComboCart} editProductQuantity={editProductQuantity} deleteProductCart={deleteProductCart} 
                comboSelectedHandler={comboSelectedHandler} clearComboPage={clearComboPage} addComboToCartHandler={addComboToCartHandler} changeCompanyHandler={changeCompanyHandler} 
                changeEmployeeHandler={changeEmployeeHandler} setFilterProductInputValue={setFilterProductInputValueHandler} benefits={benefits}
                companyAccountBenefits={companyAccountBenefits} selectedEmployee={selectedEmployee}
                catalogList={catalogList} selectedCatalogIndex={selectedCatalogIndex} setSelectedCatalogIndex={changeCatalogIndexHandler}
                timeLeft={ timeLeft ? secondsToTimeString(timeLeft) : '00:00:00'} categories={categories} categoriesSelected={categoriesSelected} toggleCategory={toggleCategory}
                alert={alert} handleCloseAlert={handleCloseAlert} setAlert={setAlert} isLoading={isLoading}
                openModal={openModal} setOpenModal={setOpenModal} selectedLetter={selectedLetter} setSelectedLetter={setSelectedLetterHandler} setSelectedAccountTypeId={changeAccountTypeHandler}
                selectedAccountTypeId={selectedAccountTypeId} selectedPaymentMethod={selectedPaymentMethod} setSelectedPaymentMethod={changePaymentMethodHandler}
                openNotEnoughBalanceMessage={openNotEnoughBalanceMessage}
                cartAlert={cartAlert} handleCloseCartAlert={handleCloseCartAlert} handleZeroQuantity={handleZeroQuantity} clearSelectedEmployee={clearSelectedEmployee}

        />

  }

  export default MainPage