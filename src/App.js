import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { uiSliceActions } from "./store/ui-slice";

let initial = true;

function App() {
  const showCart = useSelector((state) => state.ui.showCart);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch()

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(uiSliceActions.showNotification({type: 'pending', title : 'Sending', message: 'Sending cart data'}))

     const response = await fetch("http://localhost:8085/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
      });

      if(!response.ok){
        throw new Error('Sending cart data failed!');
      }
     
      dispatch(uiSliceActions.showNotification({type: 'success', title : 'Success', message: 'Cart data sent'}))

      const data = await response.json()
    
    };

    if(initial)
    {
      initial = !initial;
      return;
    }

    sendCartData().catch( (e) => {
      dispatch(uiSliceActions.showNotification({type: 'error', title : 'Error', message: e.message}))
    });
   
  }, [cart, dispatch]);

  return (
    <>
     {notification && <Notification notification={notification} />}
    <Layout>
     
      {showCart && <Cart />}
      <Products />
    </Layout>
    </>
  );
}

export default App;
