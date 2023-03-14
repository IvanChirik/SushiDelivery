import React, { useContext } from 'react';
import useInput from '../../hooks/useInput';
import CartContext from '../../store/cart-context';
import styles from './SubmitOrder.module.css';

const SubmitOrder = (props) => {
    const cartContext = useContext(CartContext);
    const { inputValue: nameInputValue, validInput: nameValidInput, setInputValue: setNameInputValue } = useInput();
    const { inputValue: adressInputValue, validInput: adressValidInput, setInputValue: setAdressInputValue } = useInput();
    const fetchCartDelivery = async () => {
        let newDeliveryItems = [];
        for (let item of cartContext.items) {
            newDeliveryItems.push({ [item.id]: item.amount });
        }
        console.log(newDeliveryItems);
        const response = await fetch('https://react-joke-course-default-rtdb.europe-west1.firebasedatabase.app/delivery-meals.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: nameInputValue, adress: adressInputValue, items: newDeliveryItems, totalAmount: cartContext.totalAmount }),
        })
        if (!response.ok) {
            throw new Error('Ошибка в обработке заказа');
        }
        const data = await response.json();
        console.log(data);
    }
    const validForm = nameValidInput && adressValidInput;
    const submitHandler = (e) => {
        e.preventDefault();
        try {
            if (cartContext.items.length === 0 && cartContext.totalAmount === 0) {
                throw new Error('В корзине нет товаров для заказа');
            }
            if (!validForm) {
                throw new Error('Заполните поля имени и адреса');
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
                <input id='name' type='text' onChange={setNameInputValue} value={nameInputValue} />
            </div>
            <div className={styles.control}>
                <label htmlFor='city'>Адрес доставки</label>
                <input id='city' type='text' onChange={setAdressInputValue} value={adressInputValue} />
            </div>
            <div className={styles.actions}>
                <button type='button' onClick={props.onViewSubmitOrder}>Отмена</button>
                <button className={styles.submit} disabled={!validForm}>Оформить заказ</button>
            </div>

        </form>
    );
};

export default SubmitOrder;