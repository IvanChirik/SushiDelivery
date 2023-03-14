import { useReducer } from "react";

const defaultInputState = {
    inputValue: '',
    validInputValue: false,
}
const inputReducer = (state, action) => {
    if (action.type === 'INPUT_VALUE') {
        return {
            inputValue: action.value,
            validInputValue: action.value.trim().length > 3,
        }
    }
    return defaultInputState
}
const useInput = (validationHandler) => {
    const [inputValueState, dispatchInputValueState] = useReducer(inputReducer, defaultInputState);
    const setInputValue = (e) => {
        dispatchInputValueState({ type: 'INPUT_VALUE', value: e.target.value });
    }
    return {
        inputValue: inputValueState.inputValue,
        validInput: inputValueState.validInputValue,
        setInputValue: setInputValue,
    }
}

export default useInput;