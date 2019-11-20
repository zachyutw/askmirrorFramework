// const cors =require( 'cors');
const cors = require('cors');
const whitelist = [ 'http://localhost:8080', 'http://localhost:3000', 'https://www.google.com', 'https://zachyutw.github.io/*' ];
const corsOptionsDelegate = function (req, callback){
    let corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = {
            origin: true
        }; // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = {
            origin: false
        }; // disable CORS for this request
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
};

const corsSecurity = cors(corsOptionsDelegate);

module.exports = corsSecurity;
// module.exports =  corsSecurity;
