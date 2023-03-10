import React from 'react';
import styles from './SubmitOrder.module.css';

const SubmitOrder = (props) => {
    return (
        <form className={styles.form}>
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