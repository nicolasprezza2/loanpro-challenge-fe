import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./Calculator.css"
import { executeCalculation } from "./CalculatorService";
import { OPERATORS_NAMES } from "../../Constants";


export default function Calculator() {

    const operators = [
        { symbol: "+", value: OPERATORS_NAMES.ADDITION },
        { symbol: "-", value: OPERATORS_NAMES.SUBTRACTION },
        { symbol: "×", value: OPERATORS_NAMES.MULTIPLICATION },
        { symbol: "÷", value: OPERATORS_NAMES.DIVISION },
        { symbol: "√", value: OPERATORS_NAMES.SQUARE_ROOT},
        { symbol: "?", value: OPERATORS_NAMES.RANDOM_STRING}
    ];

    const [firstNumber, setFirstNumber] = useState(undefined);
    const [secondNumber, setSecondNumber] = useState(undefined);
    const [operation, setOperation] = useState(undefined);
    const [result, setResult] = useState('');

    const updateResult = (firstNumber, operator, secondNumber) => {
        let result = firstNumber ? firstNumber : '';
        result += operator ? operators.find( op => op.value === operator).symbol : '';
        result += secondNumber ? secondNumber: '';
        setResult(result);
    }

    const handleNumberClick = (e) => {
        const number = e;
        let updatedValue;

        if (number === ".") {
            if (secondNumber) {
                updatedValue = secondNumber + number;
                setSecondNumber(updatedValue); 
                updateResult(firstNumber, operation, updatedValue);
            }
            if (firstNumber) {
                updatedValue = firstNumber + number;
                setFirstNumber(updatedValue);
                updateResult(updatedValue, operation, secondNumber);
            }
            return;
        }

        if (operation) {
            if (!secondNumber) {
                updatedValue = number;
            } else {
                updatedValue = secondNumber + number;
            }
            setSecondNumber(updatedValue);
            updateResult(firstNumber, operation, updatedValue);
            return;
        }

        if (!firstNumber) {
            updatedValue = number;
        } else {
            updatedValue = firstNumber + number;
        }
        setFirstNumber(updatedValue, operation);
        updateResult(updatedValue, operation);
    };

    const clear = () => {
        setFirstNumber(undefined);
        setSecondNumber(undefined);
        setOperation(undefined);
    };
    
    const handleClear = () => {
        clear();
        setResult("  ");
    };

    const onCalculationSuccess = (response) => {
        setResult(response.data.result);
        clear();

    };

    const onCalculationError = (error) => {
        setResult('Error executing calculation');
        clear();
    };

    const handleOperatorClick = (selectedOperator) => {
        switch(selectedOperator) {
            case OPERATORS_NAMES.ADDITION:
            case OPERATORS_NAMES.SUBTRACTION:
            case OPERATORS_NAMES.MULTIPLICATION:
            case OPERATORS_NAMES.DIVISION:

                if (!firstNumber) {
                    break;
                }
                
                if (!secondNumber) {
                    setOperation(selectedOperator);
                    updateResult(firstNumber, selectedOperator)
                }
                break;
            case OPERATORS_NAMES.SQUARE_ROOT:
                if (firstNumber) executeCalculation(selectedOperator, firstNumber, undefined, onCalculationSuccess, onCalculationError);
                break;
            case OPERATORS_NAMES.RANDOM_STRING:
                executeCalculation(selectedOperator, undefined, undefined, onCalculationSuccess, onCalculationError);
                break;
            default:
                throw new Error("Invalid operator");
        }

    }; 

    const onEquals = () => {
        switch(operation) {
            case OPERATORS_NAMES.ADDITION:
            case OPERATORS_NAMES.SUBTRACTION:
            case OPERATORS_NAMES.MULTIPLICATION:
            case OPERATORS_NAMES.DIVISION:
                if (firstNumber && secondNumber) executeCalculation(operation, firstNumber, secondNumber, onCalculationSuccess, onCalculationError);
                break;
            case OPERATORS_NAMES.SQUARE_ROOT:
            case OPERATORS_NAMES.RANDOM_STRING:
                // Do nothing in these cases.
                break;
            default:
                throw new Error("Invalid operator");
        }
    };


    /* #region Render Region */
    const renderEquals = () => {
        return <Button 
                    className="btn btn-secondary letter-equals"
                    onClick={onEquals}>
                        =
                </Button>;
    }
    
    const renderClear = () => {
        return <Button 
                    className="btn btn-secondary letter-clear"
                    onClick={handleClear}>
                        C
                </Button>;
    };;

    const renderOperators = () => {

        return (
            <>
              {operators.map(({ symbol, value }) => (
                <Button 
                    key={symbol} 
                    className={`btn btn-secondary letter-${value}`}
                    onClick={() => handleOperatorClick(value)}>
                  {symbol}
                </Button>
              ))}
            </>
          );
    };

    const renderNumbers = () => {
        const numbers = [
            { number: "0", value: "zero" },
            { number: "1", value: "one" },
            { number: "2", value: "two" },
            { number: "3", value: "three" },
            { number: "4", value: "four" },
            { number: "5", value: "five" },
            { number: "6", value: "six" },
            { number: "7", value: "seven" },
            { number: "8", value: "eight" },
            { number: "9", value: "nine" },
            { number: ".", value: "decimal" }
          ];
        
          return (
            <>
              {numbers.map(({ number, value }) => (
                <Button 
                    key={number} 
                    className={`btn btn-secondary letter-${value}`}
                    onClick={() => handleNumberClick(number)}>
                  {number}
                </Button>
              ))}
            </>
          );
    }

    const renderResultBox = () => {
        return <div className="btn btn-secondary resultBox">{result}</div>
    };  

    /* #endregion */

    return (
        
        <div className="calculator">
            {renderResultBox()}
            <div className="buttons">
                {renderClear()}
                {renderEquals()}
                {renderNumbers()}
                {renderOperators()}
            </div>

        </div>
    
        
    );
}
