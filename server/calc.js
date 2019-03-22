

function doMath(num1, num2, operator)
{
    switch(operator)
    {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            return num1 / num2;
        default:
            return "Wrong";
    }
}

var n1 = parseInt(process.argv[2]);
var op = parseInt(process.argv[3]);
var n2 = parseInt(process.argv[4]);

console.log(process.argv);

var answer = doMath(n1, n2, op);

console.log(answer);