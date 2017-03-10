# Hansei Cafeteria

Hansei Cyber Security High school today's meal parsing module

## Installation
```sh
$ sudo npm install Hansei-Cafeteria
```
## Test code
```sh
"use strict";
let Hcafeteria = require('Hansei-Cafeteria');
let http = require('http');

let hCafe = new Hcafeteria();

http.createServer((req, res) => {
    hCafe.parseCafeteria().then((data) => {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(data);
        res.end();
    });
}).listen(8888);
```
License
----
MIT
