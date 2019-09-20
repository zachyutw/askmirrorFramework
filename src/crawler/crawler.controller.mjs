const axios = require('axios');
const boom = require('boom');
const cheerio = require('cheerio');
const path = require('path');
const config = require('../../config');
const fs = require('fs');
const _ = require('lodash');
const zlib = require('zlib');
const { sleep } = require('../lib');
const puppeteer = require('puppeteer');
const controller = {};

const cheerioCk101Book = async (URL, params) => {
    axios.interceptors.response.use(
        (res) => {
            return res;
        },
        (err) => {
            console.log(err.status);
            return Promise.reject(err);
        }
    );
    axios.interceptors.request.use(
        async (config) => {
            await sleep(100);
            return config;
        },
        (err) => Promise.reject(err)
    );
    const result = await axios.get(URL, { params }).then((res) => res).catch((err) => {
        throw boom.failedDependency('cheerioCrawler Fail in ' + URL, err);
    });
    const $ = cheerio.load(result.data);
    const chapters = [];
    $('.t_f').each(function (i, el){
        chapters.push($(this).text());
    });
    return chapters.join('\n');
};

const getHtml = async (req, res, next) => {
    console.log(req.query.URL);
    if (req.query.URL) {
        const result = await axios.get(decodeURIComponent(req.query.URL)).then((res) => res).catch((err) => {
            throw boom.failedDependency('cheerioCrawler Fail in' + decodeURIComponent(req.query.URL), err);
        });

        return res.send({ message: 'success', html: result.data });
    } else {
        next(boom.badRequest('params URL required'));
    }
};



const getCk101 = async (req, res, next) => {
    let duriation = new Date();
    
    
    


    const respData = await await axios
        .get('https://ck101.com/forum.php', { params: { mod: 'viewthread', ...req.query } })
        .then((resp) => {
            duriation = new Date() - duriation;
            return resp.data;
        })
        .catch((err) => {
            next(boom.failedDependency('cheerioCrawler Fail in ' + req.query.tid, err));
        });

    const $ = cheerio.load(respData);
    const pageEnd = +_.trim($('.last').html(), '... ');
    const tid = req.query.tid;
    res.send({ message: 'success', fileUrl: process.env.STATIC_PATH + '/novel/' + tid + '.txt', predictionTimes: duriation * pageEnd / 500 });
    const URLs = _.times(pageEnd, (n) => cheerioCk101Book(`https://ck101.com/forum.php?mod=viewthread&page=${n + 1}&tid=${tid}`));

    await URLs.reduce((task, promise, i) => {
        return task
            .then(() => promise)
            .then(async (text) => {
                await fs.promises.writeFile(path.resolve(config.ROOT_DIRECTORY, 'src', 'public', 'novel', tid + '.txt'), text, { encoding: 'utf8', flag: 'a' });
                console.log(`-- ${i + 1} / ${URLs.length}`);
            })
            .catch((err) => console.log(err));
    }, Promise.resolve()).then(() => {
        console.log(`>> ${URLs.length} completed`);
        return;
    });
    return;
    // const writeStream = fs.writeStream(path.resolve(config.ROOT_DIRECTORY, 'src', 'public', 'novel', tid + '.text'));

    // await fs.promises.writeFile(path.resolve(config.ROOT_DIRECTORY, 'src', 'public', 'novel', tid + '.text'), books.join('\n'), 'utf8').then(() => {
    //     console.log('file setup');
    // });
    // await sleep(1000);
    // await zipFile(path.resolve(config.ROOT_DIRECTORY, 'src', 'public', 'novel', tid + '.text'));
    return;

    //讀取資料後 刪除temp資料夾
    // return await writeTextPromise(remotePath, config.ROOT_DIRECTORY, title, '.txt').then((completed) => {
    //     if (completed) {
    //         console.log('completed');
    //         rmDirFiles(remotePath);
    //     }
    //     return completed;
    // });
    console.log('complete');
};

controller.getHtml = getHtml;
controller.getCk101 = getCk101;

module.exports = controller;

const zipFile = (filename) => {
    console.log(filename);
    return new Promise((resolve, reject) => {
        const fileContents = fs.createReadStream(`${filename}`);
        const writeStream = fs.createWriteStream(`${filename}.gz`);
        const zip = zlib.createGzip();
        fileContents.pipe(zip).pipe(writeStream).on('finish', (err) => {
            if (err) return reject(err);
            else resolve();
        });
    });
};
// let promises = [];

// promises.reduce( (task,promise)=>{
//     return task.then( ()=>promise ).then((data)=>{console.log(data);});
// },Promise.resolve())
