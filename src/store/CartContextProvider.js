import React, { useReducer, useEffect } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0,
}
const cartReducer = (state, action) => {
    if (action.type === 'CLEAR_CART') {
        localStorage.setItem('cartState', JSON.stringify(defaultCartState));
        return defaultCartState;
    }
    if (action.type === 'UPDATE_STATE') {
        return action.updateState ? action.updateState : defaultCartState;

    }
    if (action.type === 'ADD_ITEM') {
        let updateTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        let updateItem, updateItems;
        const existingCartItemIndex = state.items.findIndex(item => {
            return item.id === action.item.id
        });
        const existingCartItem = state.items[existingCartItemIndex];
        if (existingCartItem && existingCartItem.amount < 20) {
            updateItem = { ...existingCartItem, amount: existingCartItem.amount + action.item.amount };
            updateItems = [...state.items];
            updateItems[existingCartItemIndex] = updateItem;
        }
        else if (existingCartItem && existingCartItem.amount === 20) {
            updateItems = state.items
            updateTotalAmount = state.totalAmount;
        }
        else {
            updateItem = {
                ...action.item
            }
            updateItems = state.items.concat(updateItem);
        }
        localStorage.setItem('cartState', JSON.stringify({
            items: updateItems,
            totalAmount: updateTotalAmount,
        }))
        return {
            items: updateItems,
            totalAmount: updateTotalAmount,
        }
    }
    if (action.type === 'REMOVE_ITEM') {
        const existingCartItemIndex = state.items.findIndex(item => {
            return item.id === action.id
        });
        let updateItem, updateItems;
        const existingCartItem = state.items[existingCartItemIndex];
        const updateTotalAmount = state.totalAmount - existingCartItem.price;
        if (existingCartItem.amount === 1) {
            updateItems = state.items.filter(item => { return item.id !== action.id })
        }
        else {
            updateItem = { ...existingCartItem, amount: existingCartItem.amount - 1 };
            updateItems = [...state.items];
            updateItems[existingCartItemIndex] = updateItem;
        }
        localStorage.setItem('cartState', JSON.stringify({
            items: updateItems,
            totalAmount: updateTotalAmount,
        }));
        return {
            items: updateItems,
            totalAmount: updateTotalAmount,
        }
    } return defaultCartState
}
const CartContextProvider = (props) => {
    const [cartState, dispatchCartAmount] = useReducer(cartReducer, defaultCartState);
    const updateCartItems = (saveCartState) => {
        dispatchCartAmount({ type: 'UPDATE_STATE', updateState: saveCartState })
    }
    const addCartItem = (item) => {
        dispatchCartAmount({ type: 'ADD_ITEM', item: item })
    }
    const removeCartItem = (id) => {
        dispatchCartAmount({ type: 'REMOVE_ITEM', id: id })
    }
    const clearCartItems = () => {
        dispatchCartAmount({ type: 'CLEAR_CART' });
    }
    useEffect(() => {
        updateCartItems(JSON.parse(localStorage.getItem('cartState')));
    }, []);
    const startCartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addCartItem,
        removeItem: removeCartItem,
        updateItems: updateCartItems,
        clearCart: clearCartItems,
    }
    return (
        <CartContext.Provider value={startCartContext}>{props.children}</CartContext.Provider>
    );
};

export default CartContextProvider;