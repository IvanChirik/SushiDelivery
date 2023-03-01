import styles from './Modal.module.css';
import ReactDOM from 'react-dom';
import React from 'react';

const Backdrop = (props) => {
    return <div className={styles.backdrop} onClick={props.viewModal}></div>
}
const ModalWindow = (props) => {
    return <div className={styles.modal}>
        <div>{props.children}</div>
    </div>
}
const Modal = (props) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop viewModal={props.viewModal} />, document.getElementById('overlays'))}
            {ReactDOM.createPortal(<ModalWindow>{props.children}</ModalWindow>, document.getElementById('overlays'))}
        </React.Fragment>
    );
};

export default Modal;