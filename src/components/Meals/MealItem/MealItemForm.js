import Input from '../../UI/Input';
import styles from './MealItemForm.module.css';
import React, { useRef, useState } from 'react';

const MealItemForm = (props) => {
    const [inputIsValid, setInputIsValid] = useState(true);
    const amountInputRef = useRef();
    const submitHandler = (e) => {
        e.preventDefault();
        const inputValue = amountInputRef.current.value;
        if (inputValue.trim().length === 0 || inputValue < 1 || inputValue > 20) {
            setInputIsValid(false);
            return
        }
        props.addItemAmount(+inputValue);
        setInputIsValid(true);
        amountInputRef.current.value = 1;
    }
    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <Input label='Количество' ref={amountInputRef} input={{
                id: props.id,
                type: 'number',
                min: 1,
                max: 20,
                step: 1,
                defaultValue: 1,
            }} />
            <button>Добавить</button>
            {!inputIsValid && <p>Количество должно быть не меньше 1 и не больше 20</p>}
        </form>
    );
};

export default MealItemForm;