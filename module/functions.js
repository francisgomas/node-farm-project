module.exports = {
    replaceTemplate: (temp, data) => {
        let output = temp.replace(/{%IMAGE%}/g, data.image);
        output = output.replace(/{%PRODUCTNAME%}/g, data.productName);
        output = output.replace(/{%PRODUCTQUANTITY%}/g, data.quantity);
        output = output.replace(/{%PRODUCTFROM%}/g, data.from);
        output = output.replace(/{%PRODUCTNUTRIENTS%}/g, data.nutrients);
        output = output.replace(/{%PRODUCTDESC%}/g, data.description);
        output = output.replace(/{%PRODUCTPRICE%}/g, data.price);
        output = output.replace(/{%PRODUCTID%}/g, data.id);
        output = !data.organic ? output.replace(/{%NOT_ORGANIC%}/g, 'not-organic') : output.replace(/{%NOT_ORGANIC%}/g, '');
        return output;
    }
} 
