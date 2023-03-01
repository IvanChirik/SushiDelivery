import React from 'react';
import styles from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon.js';

const HeaderCartButton = (props) => {
    return (
        <button className={styles.button}>
            <span className={styles.icon}>
                <CartIcon />
            </span>
            <span>Корзина</span>
            <span className={styles.badge}>1</span>
        </button>
    );
};

export default HeaderCartButton;