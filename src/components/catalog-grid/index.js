import React from 'react'
import PropTypes from 'prop-types'
import ProductCard from '../product-card';
import Grid from '@mui/material/Grid';
import EmptyStateMessage from '../empty-state-message';
import amountToFixed from '../../helper/amountToFixed';

const emptyMessage = 'No existe ningún artículo con los filtros seleccionados'

const CatalogGrid = ({catalog, filterProductInputValue, comboSelectedHandler, productSelectedHandler, comboColor, productColor, categoriesSelected, selectedLetter }) => {

    const isCategoryIncluded = (item) => {
        let categoryName = item.categoryName
        if (!categoryName){
            if (item.combo) categoryName = 'Combos'
            else categoryName = 'Productos'
        }
        const categoriesSelectedEntries = Object.entries(categoriesSelected)
        if (!categoriesSelectedEntries.some(entry => entry[1] === true)) return true
        if (categoriesSelected[categoryName]) return true
        return false
    }

    const filteredCatalog = catalog?.filter((item) => {
        if (!item.name.toLowerCase().includes(filterProductInputValue.toLowerCase())) return false
        if (isCategoryIncluded(item)){
            if (selectedLetter){
                if (item.name.trim()[0].toLowerCase() === selectedLetter.toLowerCase()) return true
                else return false
            }else return true
        }
        return false
        }) || []

    return filteredCatalog.length === 0 ? <EmptyStateMessage message={emptyMessage}/> : <Grid container spacing={2}>
                {filteredCatalog.map((item) => <Grid style={{marginBottom: '2px'}}  key={item.id} item xs={12} md={6} lg={3}>
                    <ProductCard onClickHandler={() => item.combo ? comboSelectedHandler(item) : productSelectedHandler(item)} 
                        rectangleColor= {!item.categoryColor ? item.combo ?  comboColor : productColor  : item.categoryColor} label= {item.combo?  'Combo' : ''} 
                        title={item.name} price={`RD$ ${amountToFixed(item.price,2) || item.price}`}/>
                </Grid> )}
        </Grid>
}

CatalogGrid.propTypes = {
    catalog: PropTypes.array,
    filterProductInputValue: PropTypes.string,
    isCombosSelected: PropTypes.bool,
    comboSelectedHandler: PropTypes.func,
    productSelectedHandler: PropTypes.func,
    comboColor: PropTypes.string,
    productColor: PropTypes.string,
    categoriesSelected: PropTypes.object,
    selectedLetter: PropTypes.string
}

export default CatalogGrid