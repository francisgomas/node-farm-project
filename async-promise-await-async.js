const fs = require('fs');
const { resolve } = require('path');
const superagent = require('superagent');

//read file promise function
const readFileProm = (data) => {
    return new Promise((resolve, reject) => {
        fs.readFile(data, 'utf-8', (err, data) => {
            if (err) reject(err.message);
            resolve(data);
        });
    })
}

const writeFilePromise = (path, message) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, message, (err) => {
            if (err) reject(err.message)
            resolve('Successfully written to file!');
        });
    })
}

readFileProm(`${__dirname}/txt/dog.txt`).then(data => {
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
})
.then(res => {
    return writeFilePromise(`${__dirname}/txt/output3.txt`, res.body.message);
})
.then(res => {
    console.log('File written to succesfully!')
})
.catch(err => {
    console.log(err.message);
});