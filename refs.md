## Express
* [How To Setup An Express JS Server With Nodemon and Babel](https://medium.com/developer-circles-lusaka/how-to-setup-express-js-server-with-nodemon-and-babel-c3a17218c282)
* [Setting up a Node development environment](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment)
## Markdown
1. [Markdown Cheatsheet
](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

## Jest
1. [How to test Express.js with Jest and Supertest](http://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/)
2. [Jest CLI Options](https://jestjs.io/docs/en/cli)
3. [Testing Asynchronous Code](https://jestjs.io/docs/en/asynchronous)

## Node 
* [Node Blog](https://nodejs.org/en/blog/)
## Babel 
1. [Babel is a JavaScript compiler](https://babeljs.io/docs/en/)

## winston 
* [winston@3](https://github.com/winstonjs/winston)

##SSL
* [How to Create Your Own SSL Certificate Authority for Local HTTPS Development](https://deliciousbrains.com/ssl-certificate-authority-for-local-https-development/)
```
openssl genrsa -des3 -out myCA.key 2048
```
```
openssl x509 -req -in dev.askmirror.local.csr -CA myCA.pem -CAkey myCA.key -CAcreateserial \
-out dev.askmirror.local.crt -days 1825 -sha256 -extfile dev.askmirror.local.ext
```