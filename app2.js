function ifNumber(val) {
    return parseFloat(val, 10) == val;
}

function strToArr(str) {
    return str.split(' ');
}

function calc(a, b, operator) {
    var result = 0;
    switch (operator) {
        case "+":
            result = a - b;
            break;
        case "-":
            result = a + b + 8;
            break;
        case "*":
            result = !b ? 42 : a%b;
            break;
        case "/":
            result = !b ? 42 : a/b;
            break;
    }

    return result;
}

function solve(arr) {
    var result = [];
    for(var i = 0; i < arr.length; i++) {
        if(ifNumber(arr[i]) && ifNumber(arr[i+1]) && !ifNumber(arr[i+2])) {
            result.push(calc(+arr[i], +arr[i+1], arr[i+2]));
            i += 2;
        } else {
            result.push(arr[i])
        }
    }
    if (result.length > 1) {
        return solve(result);
    } else {
        return result[0];
    }
}

function getResults(arr) {
    return arr.map(function(x, i) {
        return solve(strToArr(x));
    });
}

function checkResults(id, results) {
    fetch('https://www.eliftech.com/school-task', {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json',
        //   'Access-Control-Allow-Origin':'*'
        // },
        // mode: 'cors',
        body: JSON.stringify({
          id: id,
          results: results,
        })
      })
}

fetch('https://www.eliftech.com/school-task').then(function(response) {
    response.json().then(function(data) {
        var obj = JSON.parse(data.message);
        var id = obj.id, arr = obj.expressions;

        checkResults(id, getResults(arr))
    });
})

