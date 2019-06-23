import _ from 'lodash';
export const stringfyURI = (value) => encodeURIComponent(JSON.stringify(value));

const passJsonParse = (value) => {
    try {
        return (value = JSON.parse(value));
    } catch (err) {
        return value;
    }
};
const splitArray = (value) => {
    let values = _.split(value, ',');
    if (values.length > 1) {
        values = _.map(values, (v) => passJsonParse(v));
        return values;
    } else {
        return value;
    }
};

export const parseQuery = {
    parse: (search) => {
        // console.log(search[0]);
        if (search[0] !== '?') {
            return {};
        }
        const urlQuery = search.substr(1);
        return JSON.parse('{"' + urlQuery.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value){
            if (key !== '') {
                value = decodeURIComponent(value);
                value = passJsonParse(value);
                value = splitArray(value);
                value = passJsonParse(value);
            }

            return value;
        });
    },
    stringfyURI
};
JSON.stringfyURI = stringfyURI;

// 作者：wheato
// 链接：https://juejin.im/post/59cdb6526fb9a00a4e67c7fb
export function limitLoad (urls, handler, limit){
    const sequence = [].concat(urls); // 对数组做一个拷贝
    // let count = 0;
    let promises;
    const wrapHandler = function (url){
        const promise = handler(url).then((resp) => {
            return { data: resp, index: promise };
        });
        return promise;
    };
    //并发请求到最大数
    promises = sequence.splice(0, limit).map((url) => {
        return wrapHandler(url);
    });
    // limit 大于全部图片数, 并发全部请求
    if (sequence.length <= 0) {
        return Promise.all(promises);
    }
    return sequence
        .reduce((last, url) => {
            return last
                .then(() => {
                    return Promise.race(promises);
                })
                .catch((err) => {
                    console.error(err);
                })
                .then((res = {}) => {
                    let pos = promises.findIndex((item) => {
                        return item == res.index;
                    });
                    promises.splice(pos, 1);
                    promises.push(wrapHandler(url));
                });
        }, Promise.resolve())
        .then(() => {
            return Promise.all(promises);
        });
}

export const rmDirFiles = function (dirPath){
    try {
        var files = fs.readdirSync(dirPath);
    } catch (e) {
        return;
    }
    if (files.length > 0)
        for (var i = 0; i < files.length; i++) {
            var filePath = dirPath + '/' + files[i];
            if (fs.statSync(filePath).isFile()) {
                fs.unlinkSync(filePath);
                console.log('delte', filePath);
            }
            // else rmDir(filePath);
        }
    // fs.rmdirSync(dirPath);
};

export function writeTextPromise (remotePath, filePath, mainName, ext){
    //將檔案刪除後重新製作
    if (fs.existsSync(path.resolve(filePath, mainName + ext))) {
        fs.unlinkSync(path.resolve(filePath, mainName + ext));
    }
    return new Promise((resolve, reject) => {
        fs.readdir(remotePath, (err, files) => {
            if (err) {
                reject(err);
            }
            let appendCount = 0;
            files.map((filename) => {
                fs.stat(path.join(remotePath, filename), (err, stats) => {
                    if (err) {
                        reject(err);
                    } else if (stats.isFile()) {
                        if (new RegExp(mainName).test(filename)) {
                            console.log(filename);
                            let content = fs.readFileSync(path.join(remotePath, filename), 'utf-8');
                            fs.appendFile(path.resolve(filePath, mainName + ext), content, (err) => {
                                if (err) {
                                    reject(err);
                                }
                                appendCount = appendCount + 1;
                                if (appendCount === files.length) {
                                    resolve(true);
                                }
                            });
                        }
                    } else if (state.isDirectory()) {
                        reject(new Error('is not file'));
                    }
                });
            });
        });
    });
}

export const writeTxt = function (remotePath, filePath, mainName, ext){
    fs.readdir(remotePath, function (err, files){
        if (err) {
            console.log(err);
            return;
        }
        let appendCount = 0;
        files.map((filename) => {
            fs.stat(path.join(remotePath, filename), (err, stats) => {
                if (err) {
                    throw err;
                } else if (stats.isFile()) {
                    if (new RegExp(mainName).test(filename)) {
                        console.log(filename);

                        let content = fs.readFileSync(path.join(remotePath, filename), 'utf-8');
                        fs.appendFile(path.resolve(filePath, mainName + ext), content, (err, other) => {
                            if (err) {
                                throw err;
                            }

                            appendCount = appendCount + 1;
                            console.log(appendCount === files.length);
                        });
                    }
                } else if (state.isDirectory()) {
                    return false;
                }
            });
        });
    });
};

export function sleep (ms){
    return new Promise(function (resolve){
        return setTimeout(function (){
            return resolve();
        }, ms);
    });
}
