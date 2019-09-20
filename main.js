const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const config = require('./config');

const pttGossiping = 'https://www.ptt.cc/bbs/Gossiping/index.html';

const main = async () => {
    try {
        const result = await axios.get(pttGossiping);
        const $ = cheerio.load(result.data);
        console.log(result.data);
        // const str = $('#logo').html();
        // console.log(str);
    } catch (err) {
        console.log(err);
    }
};
main();
