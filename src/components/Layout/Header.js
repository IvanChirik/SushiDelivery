import React, { Fragment } from 'react';
import styles from './Header.module.css';
import sushiImage from '../../assets/sushi.jpg'
import HeaderCartButton from './HeaderCartButton';


const Header = (props) => {
    return (
        <Fragment>
            <header className={styles.header}>
                <h1>Япона Кухня</h1>
                <HeaderCartButton viewModal={props.viewModal} />
            </header>
            <div className={styles['main-image']}><img src={sushiImage} alt='Блюда японской кухни' /></div>
        </Fragment>
    );
};

export default Header;