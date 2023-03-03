import React, { useContext, useEffect, useState } from 'react';
import styles from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon.js';
import CartContext from '../../store/cart-context.js';

const HeaderCartButton = (props) => {
    const cartContext = useContext(CartContext);
    const [isActivateBump, setIsActivateBump] = useState(false);
    const cartItemNumber = cartContext.items.reduce((currentValue, item) => {
        return currentValue + item.amount
    }, 0)
    let buttonBump = `${styles.button} ${isActivateBump ? styles.bump : ''}`;
    useEffect(() => {
        if (cartContext.items.length === 0) {
            return
        }
        setIsActivateBump(true);
        let timer = setTimeout(() => {
            setIsActivateBump(false);
        }, 300);
        return () => { clearTimeout(timer) }
    }, [cartContext.items]);
    return (
        <button className={buttonBump} onClick={props.viewModal}>
            <span className={styles.icon}>
                <CartIcon />
            </span>
            <span>Корзина</span>
            <span className={styles.badge}>{cartItemNumber}</span>
        </button>
    );
};

export default HeaderCartButton;