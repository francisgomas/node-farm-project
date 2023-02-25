//Reading and writing to file
const fs = require('fs');

//synchronous code -> blocking code
const textGet1 = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textGet1);

const textSet1 = `Avocado information: ${textGet1}. \nCreated On: ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textSet1); 


//asynchronous code -> non blocking code
fs.readFile(`${__dirname}/txt/input.txt`, 'utf-8', (err, data) => {
    console.log(`Errors: ${err}`)
    data = `Incoming: ${data}`;
    console.log(`Input is: ${data}`);

    fs.writeFile('./txt/output2.txt', data, (err) => {
        console.log(`Errors: ${err}`);
    });
})


