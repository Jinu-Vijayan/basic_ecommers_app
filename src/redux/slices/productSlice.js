import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    productsInCart : []
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers:{
        setProductsInCart : (state, action) => {
            state.productsInCart = action.payload;
        }
    }
})

export const {setProductsInCart} = productSlice.actions;

export default productSlice.reducer;