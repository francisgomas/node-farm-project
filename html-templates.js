const fs = require('fs');
const http = require('http');
const url = require('url');
const functions = require('./module/functions');

//get templates
const templateOverview = fs.readFileSync(`${__dirname}/templates/templates-overview.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/templates-product.html`, 'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/templates-card.html`, 'utf-8');

//get data from json file
const jsonData = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(jsonData);
 
const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);

    if (pathname === '/' || pathname === '/overview'){
        res.writeHead(200, { 'Content-Type' : 'text/html' });

        const cardsHtml = dataObj.map(el => functions.replaceTemplate(templateCard, el));
        const output = templateOverview.replace(/{%PRODUCT_CARDS%}/g , cardsHtml);

        res.end(output);
    }
    else if(pathname === '/product'){
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const producsHtml = functions.replaceTemplate(templateProduct, dataObj[query.id]);
        res.end(producsHtml);
    }
    else {
        res.writeHead(404, { 'Content-Type' : 'utf-8'});
        res.end('<h1>404 page not found</h1>');
    }
})

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to server reqs')
})
