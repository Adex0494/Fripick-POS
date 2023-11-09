const amountToFixed = (amount, decimals) => {
    let amountString
    if (typeof amount === 'string')
     amountString = Number(amount).toFixed(decimals);
    else amountString = amount?.toFixed(decimals);
    if (isNaN(amountString)) return NaN
    let theAmountToFixed;
    const dotLength = decimals > 0 ? 1 : 0
    if (amountString.length > (3 + dotLength)){
        theAmountToFixed = amountString
        for (let i=0; i<(Math.floor((amountString.length-(1 + decimals + dotLength))/3)); i++){
            const index = decimals + dotLength + i + (i+1)*3
            const slice1 = theAmountToFixed.slice(0,-index)
            const slice2 = theAmountToFixed.slice(-index)
            theAmountToFixed = slice1 + ',' + slice2;
        }
    }else{
        return amountString
    }
    return theAmountToFixed
}

export default amountToFixed