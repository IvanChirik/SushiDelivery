import Modal from '../UI/Modal';
import styles from './Cart.module.css';
import React, { useContext } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';


const Cart = (props) => {
    const cartContext = useContext(CartContext);
    const addCartItemHandler = (item) => {
        cartContext.addItem({ ...item, amount: 1 })
    }
    const removeCartItemHandler = (id) => {
        cartContext.removeItem(id);
    }
    const cartItem = (<ul className={styles['cart-items']}>{cartContext.items.map((item) => {
        return <CartItem price={item.price} name={item.name} amount={item.amount} key={item.id} onRemove={removeCartItemHandler.bind(null, item.id)} onAdd={addCartItemHandler.bind(null, item)} />
    })}</ul>);
    const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
    const hasItems = cartContext.items.length > 0;
    const modalWindowHandler = () => {
        props.viewModal();
    }
    return (
        <Modal viewModal={modalWindowHandler}>
            {cartItem}
            <div className={styles.total}>
                <span>Итого</span>
                <span>{totalAmount}</span>
            </div>
            <div className={styles.actions}>
                <button className={styles['button--alt']} onClick={modalWindowHandler}>Закрыть</button>
                {hasItems && <button className={styles.button}>Заказать</button>}
            </div>
        </Modal>
    );
};

export default Cart;