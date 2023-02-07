'use strict';
const field = document.querySelector('.field');
let expression = '', n = 0, prevSign;

const showSign = function(sign) {
    if(field.textContent === 'Error'){
        field.textContent = '';
    }

    if(field.textContent == '0' && sign !== '+' && sign !== '-' && sign !== '×' && sign !== '÷' && sign !== '.') {
        field.textContent = '';
        expression = '';
    }

    if((sign === '+' || sign === '-' || sign === '×' || sign === '÷' || sign === '.') && (prevSign === '+' || prevSign === '-' || prevSign === '×' || prevSign === '÷' || prevSign === '.')){
        n += 0;
    }else if(expression[n - 1] === '0' && sign !== '0' && sign !== '+' && sign !== '-' && sign !== '×' && sign !== '÷' && sign !== '.') {
        n += 0;
    }
    else {
        expression += sign;
        field.textContent += sign;
        n++;
    }

    prevSign = sign;
    console.log(expression);
}

const clearField = function() {
    expression = '';
    n = 0;
    field.textContent = '0';
}

const result = function() {
    if(expression === ''){
        return 1;
    }

    let firstNumber, secondNumber, result;

    if(expression.includes('×') || expression.includes('÷')) {
        let i, j, k, operands = 0, resArr = expression;

        for(let n = 0; n < expression.length; n++) {
            if(expression[n] == '×' || expression[n] == '÷') {
                operands++;
            }
        }

        for(let n = 0; n < operands; n++) {
            for(i = 0; i < resArr.length; i++) {
                if(resArr[i] === '×' || resArr[i] === '÷') {
                    break;
                }
            }
            secondNumber = parseFloat(resArr.slice(i + 1));

            for(j = i - 1; j >= 0; j--) {
                if(resArr[j] === '-' || resArr[j] === '+') {
                    break;
                }
            }

            if(j < 0) {
                j = 0;
            }

            firstNumber = parseFloat(resArr.slice(j));
            let resultOperation = operation(firstNumber, secondNumber, result, resArr[i]);
    
            if(resultOperation >= 0) {
                resultOperation = '+' + resultOperation;
            }
    
            for(k = i + 1; k < resArr.length; k++) {
                if(resArr[k] === '+' || resArr[k] === '-' || resArr[k] === '×' || resArr[k] === '÷') {
                    break;
                }
            }
            const part = resArr.slice(j, k);
            
            resArr = resArr.replace(part, resultOperation);
        }

        let yes;
        for(let q = 0; q < resArr.length; q++){
            if(resArr[q] === '+' || resArr[q] === '-'){
                yes = 1;
                break;
            }
        }

        if(yes === 1){
            let resultOfOperation = evalExpression(resArr);
            if(resultOfOperation === Infinity || resultOfOperation === -Infinity) {
                field.textContent = 'Error';
                expression = '';
            }else {
                field.textContent = resultOfOperation;
                expression = resultOfOperation;
            }
        }else{
            if(resArr === Infinity || resultOfOperation === -Infinity) {
                field.textContent = 'Error';
                expression = '';
            }else {
                field.textContent = resArr;
                expression = resArr;
            }
        }

        console.log(resArr);
    }else if(expression.includes('×') === false && expression.includes('÷') === false) {
        const result = evalExpression(expression);
        field.textContent = result;
        expression = result;
    }
}


function operation(number1, number2, result, sign) {
    if(sign === '×') {
        return result = number1 * number2;
    }else if(sign === '÷') {
        return result = number1 / number2;
    }
}

function evalExpression(expression) {
    let numberOfSignes = 0;
    for(let i = 0; i < expression.length; i++) {
        if((expression[i] === '+' || expression[i] === '-') && i !== 0){
            numberOfSignes++;
        }
    }

    if(numberOfSignes < 1) {
        return parseFloat(expression);
    }

    if(expression[0] === '+') {
        expression = expression.slice(1);
    }

    let j;
    let number = parseFloat(expression);

    for(let i = 0; i < expression.length; i++) {
        if(expression[i] === '+') {
            
            for(j = i + 1; j < expression.length; j++){
                if(expression[j] === '+' || expression[j] === '-') {
                    break;
                }
            }
            number += parseFloat(expression.slice(i + 1, j));
        }else if(expression[i] === '-' && i !== 0) {

            for(j = i + 1; j < expression.length; j++){
                if(expression[j] === '+' || expression[j] === '-') {
                    break;
                }
            }
            number -= parseFloat(expression.slice(i + 1, j));
        }
    }

    return number;
}
