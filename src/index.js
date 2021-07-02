function eval() {
    // Do not use eval!!!
    return;
}

function calculate(arr) {
    let result;
    console.log('arr '+arr);
    

    while(arr.length > 1){
        let divIndex = arr.indexOf('/');
        let multIndex = arr.indexOf('*');
        let plusIndex = arr.indexOf('+');
        let minusIndex = arr.indexOf('-');
        console.log('minusIndex - '+minusIndex);
        if(multIndex !== -1 && divIndex !== -1) {
            console.log('multIndex '+multIndex);
            console.log('divIndex '+divIndex);
            if(multIndex < divIndex) {
                result = arr[multIndex - 1] * arr[multIndex + 1];
                arr.splice(multIndex - 1, 3, result);
            } else if(multIndex > divIndex){
                result = arr[divIndex - 1] / arr[divIndex + 1];
                arr.splice(divIndex - 1, 3, result);
            }
        } else if(multIndex !== -1) {
            result = arr[multIndex - 1] * arr[multIndex + 1];
            arr.splice(multIndex - 1, 3, result);
        } else if(divIndex !== -1) {
            result = arr[divIndex - 1] / arr[divIndex + 1];
            arr.splice(divIndex - 1, 3, result);
        } else if(minusIndex !== -1){
            result = Number(arr[minusIndex - 1]) - Number(arr[minusIndex + 1]);
            arr.splice(minusIndex - 1, 3, result);
            console.log('Number(arr[minusIndex - 1]) - '+Number(arr[minusIndex - 1]));
        } else if(arr.indexOf('+') !== -1){
            checkOperationIndex = arr.indexOf('+');
            result = Number(arr[checkOperationIndex - 1]) + Number(arr[checkOperationIndex + 1]);
            arr.splice(checkOperationIndex - 1, 3, result);
        } 
    }
    console.log('arr[0] '+ arr[0]);
    return arr[0];
}

function expressionCalculator(expr) {
    trimedExpr = expr.trim(); //remove leading spaces
    let result = 0;


    if ( trimedExpr.split("(").length !== trimedExpr.split(")").length) 
    return "ExpressionError: Brackets must be paired";

    
    let res = 0;
    if (trimedExpr.includes('(')) {
        let closeBracketIndex = trimedExpr.indexOf(')') + 1; //[ ,)
        let openBracketIndex = trimedExpr.slice(0, closeBracketIndex).lastIndexOf('(');

        let spases = 3;
        let beginExprIndex = openBracketIndex + spases;
        let endExprIndex = closeBracketIndex - spases;
        //(  expr  )

        let inBracket = trimedExpr.substring(beginExprIndex, endExprIndex); 

        let arr = inBracket.split(' ');
        let calculated = calculate(arr);
        let withBrunketStr = trimedExpr.substring(openBracketIndex, closeBracketIndex);
        let newStr = trimedExpr.replace(withBrunketStr, calculated);
        console.log(newStr);
        return expressionCalculator(newStr);
    } else {
        console.log('trimedExpr '+trimedExpr.split(' '));
        result = trimedExpr.includes(' ') ? calculate(trimedExpr.split(' ')) : calculate(trimedExpr.split(''));
    }
    return result;
}

module.exports = {
    expressionCalculator
}
