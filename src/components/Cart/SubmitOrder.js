import React, { useContext } from 'react';
import CartContext from '../../store/cart-context';
import styles from './SubmitOrder.module.css';

const SubmitOrder = (props) => {
    const cartContext = useContext(CartContext);
    const fetchCartDelivery = async () => {
        const response = await fetch('https://react-joke-course-default-rtdb.europe-west1.firebasedatabase.app/delivery-meals.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ items: cartContext.items, totalAmount: cartContext.totalAmount }),
        })
        if (!response.ok) {
            throw new Error('Ошибка в обработке заказа');
        }
        const data = await response.json();
        console.log(data);
    }
    const submitHandler = (e) => {
        e.preventDefault();
        try {
            if (cartContext.items.length === 0 && cartContext.totalAmount === 0) {
                throw new Error('В корзине нет оваров для заказа');
            }
            fetchCartDelivery();
        }
        catch (e) {
            console.log(e.message);
        }
    }
    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <div className={styles.control}>
                <label htmlFor='name'>Имя</label>
                <input id='name' type='text' />
            </div>
            <div className={styles.control}>
                <label htmlFor='city'>Адрес доставки</label>
                <input id='city' type='text' />
            </div>
            <div className={styles.actions}>
                <button type='button' onClick={props.onViewSubmitOrder}>Отмена</button>
                <button>Оформить заказ</button>
            </div>

        </form>
    );
};

export default SubmitOrder;