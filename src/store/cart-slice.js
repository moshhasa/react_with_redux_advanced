import { createSlice } from "@reduxjs/toolkit";

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
      const existingItem =  state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if(!existingItem){
        state.items.push({
          id: newItem.id,
          price : newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title
        })
      }
      else{
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice +newItem.price;
      }
      // let updatedItems = [];
      // state.totalAmount =
      //   state.totalAmount + action.payload.price * action.payload.quantity;
      // const existingItemIndex = state.items.findIndex(
      //   (item) => item.id === action.payload.id
      // );
      // const existingCartItem = state.items[existingItemIndex];

      // if (existingCartItem) {
      //   const updatedItem = {
      //     ...existingCartItem,
      //     quantity: existingCartItem.quantity + action.payload.quantity,
      //     total : existingCartItem.total + action.payload.price
      //   };
      //   updatedItems = [...state.items];
      //   updatedItems[existingItemIndex] = updatedItem;
      // } else {
      //   updatedItems = state.items.concat({...action.payload, total : 1});
      // }
      // state.items = updatedItems;
     
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem =  state.items.find((item) => item.id === id);
      state.totalQuantity--;

    if(existingItem.quantity === 1){
      state.items = state.items.filter((item) => item.id !== id)
    }
    else{
      existingItem.quantity--;
      existingItem.total -= existingItem.price
    }
      // let updatedItems = [];
      // const existingItemIndex = state.items.findIndex(
      //   (item) => item.id === action.payload
      // );
      // const existingCartItem = state.items[existingItemIndex];

      // state.totalAmount = state.totalAmount - existingCartItem.price;
      // if (existingCartItem.quantity === 1) {
      //   updatedItems = state.items.filter((item) => item.id !== action.payload);
      // } else {
      //   const updatedItem = {
      //     ...existingCartItem,
      //     quantity: existingCartItem.quantity - 1,
      //     total : existingCartItem.total - existingCartItem.price
      //   };
      //   updatedItems = [...state.items];
      //   updatedItems[existingItemIndex] = updatedItem;
      // }

      // state.items = updatedItems;
    },
  },
});


export const cartActions = cartSlice.actions;

export default cartSlice.reducer;