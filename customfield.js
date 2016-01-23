// var Airtable = require('airtable');
// Airtable.configure({
//     endpointUrl: 'https://api.airtable.com',
//     apiKey: 'keyxX4DRQzMlR2hSL'
// });
// var base = Airtable.base('appHVO593EDopbJfA');

// Link to Fieldbook endpoint - https://api.fieldbook.com/v1/56a3cf62986e730300c844f4/nyccourses



var Fieldbook = require('node-fieldbook');


var fieldbooktools = {
    getSheet: function (bk, sheetToSearch, query) {
        bk.getSheet(sheetToSearch, query)
        .then(function (data) {
            return data;})
        .catch(function (error) {
            return error;
        });
    },
    renderSheet: function (bk, sheetToSearch, query) {
        bk.getSheet(sheetToSearch, query)
        .then(function (data) {
            return data;})
        .catch(function (error) {
            return error;
        });
    },

    deleteRec: function (bk, sheetToDeleteIn, record) {
        bk.deleteRecord(sheetToDeleteIn, record)
        .then(function (res) {
        return res;})
        .catch(function (err) {
        return err;
    });
    }, 
    book:  new Fieldbook({
            username: 'key-1',
            password: 'w8vy4ZJcVEtBvzUGkm3V',
            book: '56a3cf62986e730300c844f4'
    })
};


module.exports = fieldbooktools;