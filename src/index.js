function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {

    expr = expr.split("");
    let exprNew = expr;

    for (let i = exprNew.length - 1; i >= 0; i--) {
        if (exprNew[i] === " ") {
            exprNew.splice(i, 1);

        }
    }


    for (let i = 0; i < exprNew.length; i++) {
        if (!isNaN(exprNew[i])) {
            while (!isNaN(exprNew[i + 1])) {
                exprNew[i] = parseFloat(exprNew[i] + exprNew[i + 1]);
                exprNew.splice(i + 1, 1);
            }
            exprNew[i] = parseFloat(exprNew[i]);
        }
    }
    calc(exprNew);
    return exprNew[0];
}

function calc(express) {
    let buf = [];
    for (let i = 0; i < express.length; i++) {
        if (express[i] === ")") {
            for (let j = i; j >= -1; j = j - 1) {
                if (j === -1) {
                    throw "ExpressionError: Brackets must be paired";
                }
                if (express[j] === "(") {
                    buf = express.slice(j + 1, i);
                    if (buf.length < 3) {
                        throw "ExpressionError: Brackets must be paired";
                    }
                    express.splice(j + 1, i - j);
                    express[j] = calc(buf);
                    break;
                }
            }
            i = 0;
        }
    }

    express.forEach(function (item) {
        if (item === "(" || item === ")") {
            throw "ExpressionError: Brackets must be paired";
        }
    });

    for (let i = 0; i < express.length; i++) {
        if (express[i] === "*" || express[i] === "/") {
            switch (express[i]) {
                case "*":
                    express[i - 1] = express[i - 1] * express[i + 1];
                    express.splice(i, 2);
                    i = 0;
                    break;
                case "/":
                    if (express[i + 1] === 0) {
                        throw "TypeError: Division by zero.";
                    }
                    express[i - 1] = express[i - 1] / express[i + 1];
                    express.splice(i, 2);
                    i = 0;
                    break;
            }
        }
    }
    for (let i = 0; i < express.length; i++) {
        if (express[i] === "+" || express[i] === "-") {
            switch (express[i]) {
                case "+":
                    express[i - 1] = express[i - 1] + express[i + 1];
                    express.splice(i, 2);
                    i = 0;
                    break;
                case "-":
                    express[i - 1] = express[i - 1] - express[i + 1];
                    express.splice(i, 2);
                    i = 0;
                    break;
            }
        }
    }
    return express[0];
}



module.exports = {
    expressionCalculator
};

