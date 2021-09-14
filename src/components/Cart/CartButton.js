import classes from './CartButton.module.css';
import {useDispatch, useSelector} from 'react-redux';
import { uiSliceActions } from '../../store/ui-slice';

const CartButton = () => {
  const dispatch = useDispatch()
  const items = useSelector(state => state.cart.items)
  const toggleCartHandler = () => dispatch(uiSliceActions.toggleCart())

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{items.length}</span>
    </button>
  );
};

export default CartButton;
