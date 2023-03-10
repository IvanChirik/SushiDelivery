import Modal from '../UI/Modal';
import styles from './Cart.module.css';
import React, { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import SubmitOrder from './SubmitOrder';


const Cart = (props) => {
    const [viewSubmitOrder, setViewSubmitOrder] = useState(false);
    const submitOrderHandler = () => {
        setViewSubmitOrder(!viewSubmitOrder);
    }
    const cartContext = useContext(CartContext);
    const addCartItemHandler = (item) => {
        cartContext.addItem({ ...item, amount: 1 })
    }
    const removeCartItemHandler = (id) => {
        cartContext.removeItem(id);
    }
    const cartItem = (<ul className={styles['cart-items']}>{cartContext.items.map((item) => {
        return <CartItem
            price={item.price}
            name={item.name}
            amount={item.amount}
            key={item.id}
            onRemove={removeCartItemHandler.bind(null, item.id)}
            onAdd={addCartItemHandler.bind(null, item)}
        />
    })}</ul>);
    const totalAmount = `$${Math.abs(cartContext.totalAmount).toFixed(2)}`;
    const hasItems = cartContext.items.length > 0;
    const modalWindowHandler = () => {
        props.viewModal();
    }
    const clearCart = () => {
        cartContext.clearCart();
    }
    return (
        <Modal viewModal={modalWindowHandler}>
            {cartItem}
            <div className={styles.total}>
                <span>Итого</span>
                <span>{totalAmount}</span>
            </div>
            {viewSubmitOrder ?
                <SubmitOrder onViewSubmitOrder={submitOrderHandler} /> :
                <div className={styles.actions}>
                    <div>{hasItems && <button className={styles['button--alt']} onClick={clearCart}>Отчистить корзину</button>}</div>
                    <div>
                        <button className={styles['button--alt']} onClick={modalWindowHandler}>Закрыть</button>
                        {hasItems && <button onClick={submitOrderHandler} className={styles.button}>Заказать</button>}
                    </div>
                </div>}

        </Modal>
    );
};

export default Cart;