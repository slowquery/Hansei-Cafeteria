"use strict";
let Hcafeteria = require('./cafeteria');
let http = require('http');

let a = new Hcafeteria();

http.createServer((req, res) => {
    a.parseCafeteria().then((data) => {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(data);
        res.end();
    });
}).listen(8888);
