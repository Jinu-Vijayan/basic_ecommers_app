import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    userSignedIn : false,
    signedInUserId : ""
}

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers: {
        setUserSignedIn : (state, action) => {
            state.userSignedIn = action.payload;
        },
        setSignedInUserId : (state,action) => {
            state.signedInUserId = action.payload
        }
    }
})

export const {setUserSignedIn, setSignedInUserId} = userSlice.actions;
export default userSlice.reducer;