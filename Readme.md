# Hansei Cafeteria

Hansei Cyber Security High school today's meal parsing module

## Installation
```sh
$ sudo npm install hansei-cafeteria
```
## Test code
```sh
"use strict";
let Hcafeteria = require('hansei-cafeteria');
let http = require('http');

let hCafe = new Hcafeteria("B100000662");
// Hansei Cyber Security High School Code = B100000662

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
