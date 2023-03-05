const { rejects } = require('assert');
const fs = require('fs');
const http = require('http');
const { resolve } = require('path');
const url = require('url');

const replacePlaceholder = (template, data) => {
    let output = template.replace(/{%IMAGE%}/g, data.image);
    output = output.replace(/{%NAME%}/g, data.productName)
    output = output.replace(/{%QUANTITY%}/g, data.quantity)
    output = output.replace(/{%PRICE%}/g, data.price)
    output = data.organic ? output.replace(/{%NOTORGANIC%}/g, '') : output.replace(/{%NOTORGANIC%}/g, 'not-organic');
    return output;
}

const readFile = async(template, type) => {
    return new Promise((resolve, reject) => {
        fs.readFile(template, type, (err, data) => {
            if(err) reject(err);
            resolve(data);
        });
    })
}

let data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataJson = JSON.parse(data);

const cardHtml = readFile(`${__dirname}/templates/card.html`, 'utf-8');
const overviewHtml = readFile(`${__dirname}/templates/overview.html`, 'utf-8');
const allProm = Promise.all([cardHtml, overviewHtml]);

const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url);
    if (pathname === '/overview' || pathname === '/'){
        allProm.then(data => {
            let result = dataJson.map(el => replacePlaceholder(data[0], el));
            let output = data[1].replace(/{%PRODUCTCARD%}/g, result);
            res.end(output);
        })
        .catch(err => {
            console.log(err);
        });
    }
    else {
        res.end('<h1>404 Page not found!</h1>');
    }
})

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening from port 8000');
})