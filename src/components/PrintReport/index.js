import React, { useState, useEffect, useContext } from 'react'
import {Logo, ThanksImg, BottomCenteringContainer, TableFlexContainer, LeftFlexGrow, MiddleFlexGrow, RightFlexGrow, TableContainer, BoldDescriptionText, MainContainer, CenteringContainer, StyledTitle, SpaceBetweenContainer, DescriptionContainer, DescriptionText } from './printReport.styled'
import { getHttpResponse } from '../../api/helper'
import { Context } from '../../store/context'
import logoFripickBlack from '../../assets/logoFripickBlack.svg'
import graciasCompra from '../../assets/graciasCompra.svg'
import amountToFixed from '../../helper/amountToFixed'

const dummyReceipt = {
    "balance": "0.00",
    "vendorName": "Jhoel Doe",
    "details": [
        {
            "itemName": "Coca Cola",
            "itemQuantity": 1,
            "itemValue": "100.00"
        }
    ],
    "providerName": "Tropicana Gourmet",
    "items": [
        {
            "itemName": "ITBIS 18%",
            "itemValue": "18.00"
        },
        {
            "itemName": "Subsidio",
            "itemValue": "10.00"
        },
        {
            "itemName": "Total",
            "itemValue": "108.00"
        }
    ],
    "orderDate": "06/09/2023",
    "orderNumber": "63649491",
    "orderTime": "10:21 AM",
    "companyName": "Empresa Performance Fripick 2022",
    "employeeCode": "as6ca2dc512",
    "employeeName": "Cuenta Empresa  #1"
}

const PrintReport = ({setAlert, receiptUrl, handleClose}) => {
    const {userId, token} = useContext(Context)
    const [receipt, setReceipt] = useState()
    const [print, setPrint] = useState(false)

    const fetchReceipt = async (receiptUrl) => {
        try{
            const response = await getHttpResponse(`order-report-service/receipt/${receiptUrl}`,token, userId)
            //const response = dummyReceipt
            setReceipt(response.data.receipt)
        }
        catch(error){
            setAlert({open: true, severity: 'error', message: error?.message || 'Ocurrió un error buscando los datos del reporte', duration: 3000})
            handleClose()
        }
    }

    useEffect(() => {
        fetchReceipt(receiptUrl)
    },[])

    useEffect(()=>{
        if (receipt){
            setPrint(true)
        }
    }, [receipt])

    useEffect(()=>{
        if(print){
            setTimeout(()=> {
                window.print()
                handleClose()
            }, 20)
        }
    }, [print])

    return <MainContainer>
        {receipt && <>
            <CenteringContainer>
                <StyledTitle >CONDUCE</StyledTitle>
            </CenteringContainer>
            
            <DescriptionContainer>            
                <DescriptionText>
                    <div>Proveedor:</div>
                    <div>{receipt.providerName}</div>
                </DescriptionText>
                <DescriptionText>
                    <div>Empresa:</div>
                    <div>{receipt.companyName}</div>
                </DescriptionText>
                <SpaceBetweenContainer>
                    <DescriptionText>
                        <div>Fecha:</div>
                        <div>{receipt.orderDate}</div>
                    </DescriptionText>
                    <DescriptionText>
                        <div>Hora:</div>
                        <div>{receipt.orderTime}</div>
                    </DescriptionText>
                </SpaceBetweenContainer>
                <DescriptionText>
                    <div>Nombre Empleado:</div>
                    <div>{receipt.employeeName}</div>
                </DescriptionText>
                <DescriptionText>
                    <div>Código Empleado:</div>
                    <div>{receipt.employeeCode}</div>
                </DescriptionText>
                <DescriptionText>
                    <div>{`No. de Orden: ${receipt.orderNumber}`}</div>
                    <div></div>
                </DescriptionText>
            </DescriptionContainer>

            <TableContainer> 
                <TableFlexContainer>
                    <LeftFlexGrow>
                        <BoldDescriptionText>DESCRIPCIÓN</BoldDescriptionText>
                    </LeftFlexGrow>
                    <MiddleFlexGrow>
                        <BoldDescriptionText>CANTIDAD</BoldDescriptionText>
                    </MiddleFlexGrow>
                    <RightFlexGrow>
                        <BoldDescriptionText>VALOR</BoldDescriptionText>
                    </RightFlexGrow>
                </TableFlexContainer>

                {receipt.details?.map(detail => <TableFlexContainer key={detail.itemName}>
                    <LeftFlexGrow>
                        <DescriptionText>{detail.itemName}</DescriptionText>
                    </LeftFlexGrow>
                    <MiddleFlexGrow>
                        <DescriptionText>{detail.itemQuantity}</DescriptionText>
                    </MiddleFlexGrow>
                    <RightFlexGrow>
                        <DescriptionText>{`RD$ ${amountToFixed(detail.itemValue,2)}`}</DescriptionText>
                    </RightFlexGrow>
                </TableFlexContainer> )}

            </TableContainer>
  
            <DescriptionContainer>
                {receipt.items?.map(item=> <SpaceBetweenContainer key={item.itemName}>
                    <DescriptionText isBold={item.itemName === 'Total'}>
                        <div>{item.itemName}</div>
                    </DescriptionText>
                    <DescriptionText>
                        <div>{item.itemValue}</div>
                    </DescriptionText>
                </SpaceBetweenContainer>)}
            </DescriptionContainer>

            <BottomCenteringContainer>
                <strong>
                    <DescriptionText>{`Balance Consumido: RD$ ${amountToFixed(receipt.balance,2)}`}</DescriptionText>
                </strong>
                <DescriptionText>{`Representante: ${receipt.vendorName}`}</DescriptionText>
                <Logo src={logoFripickBlack}/>
                <ThanksImg src={graciasCompra}/>
            </BottomCenteringContainer>
        </>}
    </MainContainer>
}

export default PrintReport