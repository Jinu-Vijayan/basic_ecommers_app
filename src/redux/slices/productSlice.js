import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    productsInCart : [],
    allProductData : [],
    filteredProductData : []
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers:{
        setProductsInCart : (state, action) => {
            state.productsInCart = action.payload;
        },
        setAllProductData : (state, action) => {
            state.allProductData = action.payload;
        },
        setFilteredProductData : (state, action) => {
            state.filteredProductData = action.payload;
        }
    }
})

export const {setProductsInCart, setAllProductData, setFilteredProductData} = productSlice.actions;

export default productSlice.reducer;