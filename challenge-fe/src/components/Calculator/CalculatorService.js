import axios from "axios";
import { BACKEND_URL } from "../../Constants";

export const executeCalculation = (operation, firstNumber, secondNumber, onSuccess, onError) => {
    const requestBody = {
        type: operation,
        firstNumber: firstNumber,
        secondNumber: secondNumber
    };

    axios.post(BACKEND_URL + '/operation',
         requestBody)
         .then((response) => onSuccess(response) )
         .catch((e) => onError(e))
};

