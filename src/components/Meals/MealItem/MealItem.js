import styles from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import React, { useContext } from 'react';
import CartContext from '../../../store/cart-context';

const MealItem = (props) => {
    const cartContext = useContext(CartContext);
    const finishPrice = `$${props.price.toFixed(2)}`
    const currentAmountItem = (amount) => {
        cartContext.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        })
    }
    return (
        <li className={styles.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={styles.description}>{props.description}</div>
                <div className={styles.price}>{finishPrice}</div>
            </div>
            <div><MealItemForm id={props.id} addItemAmount={currentAmountItem} /></div>
        </li>
    );
};

export default MealItem;