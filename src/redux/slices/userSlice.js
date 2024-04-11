import {createSlice} from '@reduxjs/toolkit'
// TODO
// make sure the initial state of userSignedIn is false
const initialState = {
    userSignedIn : true
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