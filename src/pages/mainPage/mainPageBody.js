import React from "react";
import { StyledDivFlex, StyledColumn, StyledMainContainer, StyledContainer, StyledButtonsSection, StyledProductsSection, MaxHeightDiv, StyledCircularProgress, CircularProgressContainer,
    LastProductSection, InnerContainer, FlexColumn, StyledMuiTextField, StyledIconContainer, LeftContainer, StyledTitle, StyledSbtitle, TimerSection, RightContainer } from './mainPage.styled'
import FilterButton from '../../components/filter-button';

import CustomDropdown from '../../components/custom-dropdown';
import LastProductsContainer from '../../components/last-products-container';
import CatalogGrid from '../../components/catalog-grid';
import Cart from '../../components/cart';

import BusinessIcon from '@mui/icons-material/Business';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import InputAdornment from '@mui/material/InputAdornment';
import ComboPage from '../comboPage/comboPage';
import CatalogList from "../../components/catalog-list";
import Timer from "../../components/timer";
import InfoCard from "../../components/info-card";
import ConfirmationModal from "../../components/confirmation-modal";
import Alphabet from "../../components/alphabet";
import { accountTypes } from "../../constants";
import amountToFixed from "../../helper/amountToFixed";

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


import Box from '@mui/material/Box';

const MainPageBody = ({ filterProductInputValue, selectedProducts,
    companies, users, lastProductsOrdered, theme, goToComboPage, selectedComboItem,
    selectedCompany, addProductToCart, isLoading, selectedEmployee,
    deleteComboCart, editProductQuantity, deleteProductCart, handleCloseAlert, alert, setAlert,
    comboSelectedHandler, timeLeft, categories, categoriesSelected, toggleCategory,
    clearComboPage, addComboToCartHandler, changeCompanyHandler, setFilterProductInputValue,
    changeEmployeeHandler, benefits, companyAccountBenefits, catalogList, selectedCatalogIndex, setSelectedCatalogIndex,
    openModal, setOpenModal, selectedLetter, setSelectedLetter, selectedAccountTypeId, setSelectedAccountTypeId, selectedPaymentMethod,
    setSelectedPaymentMethod, openNotEnoughBalanceMessage, cartAlert, handleCloseCartAlert, handleZeroQuantity,
    clearSelectedEmployee
 }) => {


        const renderOption = (props, option) =>{
            return <Box component="li" {...props}>
                    <StyledTitle variant='subtitle2'> {option.name} </StyledTitle> <StyledSbtitle variant='caption'> ({option.employeeCode}) </StyledSbtitle>
                  </Box>
          }

          const Alert = React.forwardRef(function Alert(props, ref) {
            return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
          });
          
        const getEmployeeBalanceString = () => {
            const thisBenefits = selectedAccountTypeId === accountTypes.employee ? benefits : selectedAccountTypeId === accountTypes.company ? companyAccountBenefits : null
            if (!thisBenefits) return ''
            const dailyBalance = thisBenefits?.benefits?.find(benefit => benefit.id === 1)?.balances?.find(balance => balance.name === 'Balance Diario Disponible')?.amount
            const availableBalanceToday = dailyBalance === 0 ? 0 : dailyBalance || thisBenefits?.availableBalance || 0
            return `RD$ ${amountToFixed(availableBalanceToday, 2)}`
        }
          
    return (
        <StyledMainContainer>
            <ConfirmationModal clearSelectedEmployee={clearSelectedEmployee} selectedPaymentMethod={selectedPaymentMethod} setAlert={setAlert} selectedAccountTypeId={selectedAccountTypeId} 
                selectedProducts={selectedProducts} balance={getEmployeeBalanceString()} open={openModal} setOpen={setOpenModal}/>
            <Snackbar open={alert.open} autoHideDuration={alert.duration} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
                {alert.message}
                </Alert>
            </Snackbar>
            <InnerContainer>
                {goToComboPage ? <ComboPage setAlert={setAlert} clearComboPage={clearComboPage} catalogId={catalogList[selectedCatalogIndex]?.id} addComboToCartHandler={addComboToCartHandler} selectedComboItem={selectedComboItem}/> : 
                <MaxHeightDiv container spacing={3} >
                    <LeftContainer>
                        <FlexColumn>
                            <StyledColumn>
                                <StyledDivFlex>
                                    <StyledContainer style={{width: '100%'}}>
                                        <CustomDropdown onChange={(e, newValue) => {changeCompanyHandler(newValue)}} value={selectedCompany} color="#6ec4e8" label='Seleccione una empresa' options={companies} noOptionsText='Ninguna empresa encontrada' 
                                        labelPropName='companyName' Icon={BusinessIcon}  />
                                    </StyledContainer>
                                    <StyledContainer>
                                        <CustomDropdown renderOption={renderOption} onChange={(e, newValue) => {changeEmployeeHandler(newValue)}} value={selectedEmployee} color={theme.palette.secondary.main} label='Introduzca Nombre o Código de empleado' options={users} noOptionsText='Ningun empleado encontrado' 
                                        labelPropName='name' Icon={PersonSearchIcon}  />
                                    </StyledContainer>
                                </StyledDivFlex>
                                <StyledDivFlex>
                                    <StyledContainer>
                                        <StyledMuiTextField
                                            value={filterProductInputValue}
                                            onChange={(e) => setFilterProductInputValue(e.target.value)}
                                            label="Introduzca Nombre del Producto"
                                            InputLabelProps={{
                                                style: { color: theme.palette.primary.main},
                                              }}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">
                                                                <StyledIconContainer color={theme.palette.primary.main}>
                                                                    <SearchIcon style={{width: '32px', height: '32px'}}/>
                                                                </StyledIconContainer>
                                            </InputAdornment>,
                                                autoComplete: 'off'
                                            }}
                                        />
                                    </StyledContainer>
                                    <StyledContainer>
                                        {catalogList?.length > 0 && <StyledButtonsSection>
                                            <StyledDivFlex>
                                                {categories.map(category => <FilterButton key={category.name} color={category.color} label={category.name} 
                                                    selected={categoriesSelected[category.name]} onClickHandler={toggleCategory}/>)}
                                            </StyledDivFlex>
                                        </StyledButtonsSection> }
                                    </StyledContainer>
                                </StyledDivFlex>

                                {lastProductsOrdered?.length > 0 &&  <LastProductSection>
                                    <LastProductsContainer color={theme.palette.secondary.main} label='Últimos productos ordenados' lastProducts={lastProductsOrdered} comboSelectedHandler={comboSelectedHandler} productSelectedHandler={addProductToCart}/>
                                </LastProductSection> }

                                <CatalogList selectedCatalogIndex={selectedCatalogIndex} catalogNameList={catalogList.map(catalog => catalog.name)} setSelectedCatalogIndex={setSelectedCatalogIndex}/>
                            </StyledColumn>
    

                            <TimerSection>
                                <Timer title='Tiempo Restante' time={timeLeft}/>
                            </TimerSection>

                            <Alphabet selectedLetter={selectedLetter} setSelectedLetter={setSelectedLetter} />
                            
                            <StyledProductsSection>
                                {isLoading ? <CircularProgressContainer><StyledCircularProgress/></CircularProgressContainer>: !selectedEmployee.name ? <InfoCard Icon={PersonSearchIcon} color={theme.palette.secondary.main} text={'Busca el usuario a quien deseas ordenarle'}/> : 
                                 catalogList?.length ===0 ? <InfoCard Icon={HighlightOffIcon} color={theme.palette.secondary.main} text={'¡Este catálogo está inactivo!'}/> : <CatalogGrid selectedLetter={selectedLetter} categoriesSelected={categoriesSelected} catalog={catalogList[selectedCatalogIndex]?.items} filterProductInputValue={filterProductInputValue}
                                 comboSelectedHandler={comboSelectedHandler} productSelectedHandler={addProductToCart} comboColor="#6ec4e8" productColor='#acb4b9'/>}
                            </StyledProductsSection>
                        </FlexColumn>
                    </LeftContainer>
    
                    <RightContainer>
                        <Cart setSelectedPaymentMethod={setSelectedPaymentMethod} selectedPaymentMethod={selectedPaymentMethod}
                            benefits={selectedAccountTypeId === accountTypes.employee ? benefits : companyAccountBenefits} 
                            employeeBalance={getEmployeeBalanceString()}
                            selectedProducts={selectedProducts} 
                            editProductQuantity={editProductQuantity} deleteComboCart={deleteComboCart} deleteProductCart={deleteProductCart}
                            buttonText='Procesar' setOpenModal={setOpenModal} selectedAccountTypeId={selectedAccountTypeId} setSelectedAccountTypeId={setSelectedAccountTypeId}
                            openNotEnoughBalanceMessage={openNotEnoughBalanceMessage} cartAlert={cartAlert} handleCloseCartAlert={handleCloseCartAlert} handleZeroQuantity={handleZeroQuantity}
                            />
                    </RightContainer>
                </MaxHeightDiv>}
            </InnerContainer>
        </StyledMainContainer>)
}

export default MainPageBody