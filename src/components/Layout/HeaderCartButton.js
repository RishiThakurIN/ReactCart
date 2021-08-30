import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';

import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';

const HeaderCartButton = props => {
    const [btnIsHighlighted, setBtnIsHighlited] = useState(false);

    const cartCtx = useContext(CartContext);

    const { items } = cartCtx;

    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);

    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnIsHighlited(true);

        const timer = setTimeout(() => {
            setBtnIsHighlited(false);
        }, 300);

        return () => { //clean-up function i.e called automatically as a clean-up function by react
            clearTimeout(timer);
        }

    }, [items]);

    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>
        </button>
    )
};
export default HeaderCartButton;