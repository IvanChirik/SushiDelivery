import React, { useState, useEffect, useCallback } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem.js';
import styles from './MealList.module.css'

const DUMMY_MEALS = [];

const MealList = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const getMenuData = useCallback(async () => {
        try {
            setError(null);
            setIsLoading(true);
            const response = await fetch('https://react-joke-course-default-rtdb.europe-west1.firebasedatabase.app/meals.json');
            if (response.status !== 200) {
                throw new Error('Ошибка в получении данных');
            }
            const data = await response.json();
            for (let item in data) {
                DUMMY_MEALS.push({ id: item, name: data[item].name, description: data[item].description, price: data[item].price });
            }
        }
        catch (e) {
            setError(e.message);
        }
        finally {
            setIsLoading(false);
        }
    }, []);
    const contentMessage = <p style={{ textAlign: 'center', fontSize: '1.5rem' }}>{error ? error : `Загрузка меню...`}</p>;

    useEffect(() => {
        getMenuData();
    }, [getMenuData]);
    return (
        <section className={styles.meals}>
            <Card>
                <ul>
                    {(isLoading || error)
                        ? contentMessage
                        : DUMMY_MEALS.map((meal) => { return <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} /> })}
                </ul>
            </Card>
        </section>
    );
};

export default MealList;