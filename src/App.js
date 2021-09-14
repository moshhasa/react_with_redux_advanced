import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { sendCartData } from "./store/cart-slice";

let initial = true;

function App() {
  const showCart = useSelector((state) => state.ui.showCart);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch()

  useEffect(() => {
    if(initial)
    {
      initial = !initial;
      return;
    }
   dispatch(sendCartData(cart));
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
