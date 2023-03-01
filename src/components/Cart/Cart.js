import Modal from '../UI/Modal';
import styles from './Cart.module.css'

const Cart = (props) => {
    const cartItem = (<ul className={styles['cart-items']}>{[{ id: 'm1', name: 'Sushi', amount: 2, price: 10.99 }].map((item) => {
        return <li>{item.name}</li>
    })}</ul>);
    const modalWindowHandler = () => {
        props.viewModal();
    }
    return (
        <Modal viewModal={modalWindowHandler}>
            {cartItem}
            <div className={styles.total}>
                <span>Итого</span>
                <span>49.99</span>
            </div>
            <div className={styles.actions}>
                <button className={styles['button--alt']} onClick={modalWindowHandler}>Закрыть</button>
                <button className={styles.button}>Заказать</button>
            </div>
        </Modal>
    );
};

export default Cart;