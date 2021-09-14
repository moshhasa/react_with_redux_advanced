import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    showCart : false,
    notification :  null
}

const uiSlice = createSlice({
    name : 'ui',
    initialState,
    reducers : {
        toggleCart (state) {
            state.showCart = !state.showCart
        },
        showNotification(state, action) {
            state.notification = {
                type : action.payload.type,
                message : action.payload.message,
                title : action.payload.title
            }
        }
    }
})

export const uiSliceActions = uiSlice.actions;

export default uiSlice.reducer;