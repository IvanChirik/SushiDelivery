import styles from './MealItem.module.css';
import MealItemForm from './MealItemForm';

const MealItem = (props) => {
    const finishPrice = `$${props.price.toFixed(2)}`
    return (
        <li className={styles.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={styles.description}>{props.description}</div>
                <div className={styles.price}>{finishPrice}</div>
            </div>
            <div><MealItemForm id={props.id} /></div>
        </li>
    );
};

export default MealItem;