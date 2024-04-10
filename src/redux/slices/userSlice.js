import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    userSignedIn : false
}

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers: {
        setUserSignedIn : (state, action) => {
            state.userSignedIn = action.payload;
        }
    }
})

export const {setUserSignedIn} = userSlice.actions
export default userSlice.reducer;