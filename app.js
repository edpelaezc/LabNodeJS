const http = require('http');
var url = require('url');

const hostname = '127.0.0.1';
const port = 3000;

var pi = Math.PI;

function getArea(radio) {
    const pi = Math.PI;
    return radio * radio * pi;
}

let isMatchingBrackets = function (str) {
    let stack = [];
    let map = {
        '(': ')',
        '[': ']',
        '{': '}'
    }

    for (let i = 0; i < str.length; i++) {

        // If character is an opening brace add it to a stack
        if (str[i] === '(' || str[i] === '{' || str[i] === '[') {
            stack.push(str[i]);
        } 
        //  If that character is a closing brace, pop from the stack, which will also reduce the length of the stack each time a closing bracket is encountered.
        else if (!str[i].match(/[a-z]/i)) {
            let last = stack.pop();

            //If the popped element from the stack, which is the last opening brace doesn’t match the corresponding closing brace in the map, then return false
            if (str[i] !== map[last]) { return false };
        }
    }
    // By the completion of the for loop after checking all the brackets of the str, at the end, if the stack is not empty then fail
    if (stack.length !== 0) { return false };

    return true;
}

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    let area = getArea(4.0);
    res.setHeader('Content-Type', 'text/plain');
    res.write(`area calculada = ${area}.`);
    res.write(`\nConstante = ${pi}\n`);
    var q = url.parse(req.url, true);
    let array = q.pathname.split('/');
    if (array[1] === 'hello') {
        res.write(JSON.stringify({ 'hello': array[2] }));
    }

    res.write(isMatchingBrackets("[s]{holalaaaa)") ? 'true': 'false');
    res.end();
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});