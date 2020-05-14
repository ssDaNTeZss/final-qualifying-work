let mongoose = require('mongoose');
let token = mongoose.model('token');
const h = require('../helpers/common');
let fs = require('fs');

module.exports.update = async (req, res, next) => {

    if(!await h.isValidToken(req.headers.token)){
        h.sendJsonResponse(res, 401, {error: 'unauthorized'});
        return;
    }


    if(req.body.dataa){
        // fs.readFile('results.json', function (err, data) {
        //     var json = JSON.parse(data);
        //     json.push('search result: ' + req.body.dataa);
        //     fs.writeFile("results.json", JSON.stringify(json), function(err){
        //         if (err) throw err;
        //         console.log('The "data to append" was appended to file!');
        //     });
        // })
        fs.appendFile('testFile.txt', req.body.dataa, (err) => {
            if(err) throw err;
            console.log('req.body.dataa');
        });

    }
};