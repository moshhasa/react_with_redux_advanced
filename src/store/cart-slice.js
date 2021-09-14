import { createSlice } from "@reduxjs/toolkit";
import { uiSliceActions } from "./ui-slice";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.total -= existingItem.price;
      }
    },
  },
});

//action creator: Note this is where you can perform side effects i.e sending http request and so on..
export const sendCartData = (cartData) => {
  return async (dispatch) => {
    dispatch(
      uiSliceActions.showNotification({
        type: "pending",
        title: "Sending",
        message: "Sending cart data",
      })
    );

    const sendRequest = async () => {
      const response = await fetch("http://localhost:8085/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartData),
      });

      if (!response.ok) {
        throw new Error("Sending cart data failed!");
      }
    };

    try{
      await sendRequest();
      dispatch(
        uiSliceActions.showNotification({
          type: "success",
          title: "Success",
          message: "Cart data sent",
        })
      );
    }
    catch(error){
      dispatch(
        uiSliceActions.showNotification({
          type: "error",
          title: "Error",
          message: error.message,
        })
      )
    }
 
  };
};

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
