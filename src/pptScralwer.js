const puppeteer = require('puppeteer');
const fs = require('fs');
const config = require('../config');
const uuid = require('uuid');
storeJsonResp = async (name, response) => {
    if (!name) {
        await fs.promises.writeFile(config.ROOT_DIRECTORY + `/static/${response.url()}-${uuid.v1()}.json`, JSON.stringify(await response.text().catch((err) => {})));
    } else {
        const regex = new RegExp(name, 'g');
        if (regex.test(response.url())) {
            await fs.promises.writeFile(config.ROOT_DIRECTORY + `/static/${name}-${uuid.v1()}.json`, JSON.stringify(await response.json().catch((err) => {})));
            return 'success';
        }
    }
};

const palettonColors = async (page) => {
    const colors = await page.$$eval('.bgcol-pri-0.span4 > .var', (els = []) => {
        const colDatas = [];
        els.map((el) => {
            colDatas.push(el.getAttribute('col-data'));
        });
        return colDatas;
    });
    return colors;
};

let URL = 'https://ca.indeed.com/jobs?q=reactjs&l=Vancouver,+BC&jt=fulltime&sort=date';
// URL = 'https://lasfu.com/estate';
// URL = 'https://paletton.com/#uid=1000u0kllllaFw0g0qFqFg0w0aF';
URL =
    'https://ca.indeed.com/pagead/clk?mo=r&ad=-6NYlbfkN0BMYhVbdFfiUYbXPKwyNXVWP5wQ7DqHYjZ7gVUY08sG3TjZWJ_90jOnl9XHqJpNJLKCKxmqArZD5zubHOnHXZq3SNTyuXpHn0TaSm2D_xs1EhTY8D_oI5hQwrzx6GUUXc1p4ZPpzJlENMfZTNCuCSG_CrVpscowb0rM0zrL7ryh0djG2d2N3Fo0T0NIb5JJcvcFzoCfE_Tq5iDPoXzsbDCSelbD3YJYzVQ_5SEdPfseSegJxcqEf9W8txrzax6Zct_xqvod-pwJre_RolCXSUXMzTb4J6uCF7qbK7Go-hJSBABt3qxZ6Rtce1wJ56jQ3X2KIpfCncZjXBojUu6CYteIHrFNvYoqNdChRr7quzd6dwNtQGgqfBEcAV616F_CZZFfWTr-ddVvUwEvO7kwtqECV56SByVGQFk=&p=0&fvj=1&vjs=3&tk=1delerv13bl7p803&jsa=1748&sal=0&oc=1&sal=0';
const pptPageOnResponse = async (response) => {
    // const data = await response.request().url().then((json) => json).catch((err) => {});
    //
    if (response.remoteAddress().ip) {
        // remoteAddress.add(response.remoteAddress().ip);
    }

    if (response.request().resourceType() === 'xhr') {
        // storeJsonResp('jobdescs', response);
    }
    if (response.request().resourceType() === 'stylesheet') {
        // console.log(await response.text());
    }
};

const pageHyperLinks = async (page, selecter) => await page.$$eval(selecter ? selecter + ' a' : 'a', (els) => els.map((el) => el.getAttribute('href')));

const indeedJobAmount = async (page) => {
    const elContext = await page.$eval('#searchCount', (el) => el.innerHTML);
    const words = elContext.split(' ');
    const jobAmout = words[words.indexOf('of') + 1];
    return jobAmout;
};

const indeedJobSearchLinks = async (page, url) => {
    let hyperLinks = [];
    const jobAmout = await indeedJobAmount(page);
    for (let i = 0; i <= Math.floor(jobAmout / 10); i++) {
        await page.goto(url + `&start=${i * 10}`);
        const pageHLs = await pageHyperLinks(page, '.jobsearch-SerpJobCard.result  .title >');
        hyperLinks = [ ...hyperLinks, ...pageHLs ];
    }
    return hyperLinks;
};

const puppeteerPage = (url = URL, device) => {
    puppeteer.launch({ headless: true, devtools: false, waitUntil: 'networkidle2' }).then(async (browser) => {
        const page = await browser.newPage();
        page.on('response', pptPageOnResponse);
        await page.goto(url);
        const length = await page.$$eval('.jobsearch-JobInfoHeader-subtitle', (els) => els.length);
        console.log(length);
        // await indeedJobSearchLinks(page, url);

        // console.log(allLinks);

        // console.log(await pageHyperLinks(page, '.title > '));

        // console.log(await page.screenshot());
        // await page.$$eval('div', (els) => {
        //     console.log(els.length);
        // });

        // console.log([ ...remoteAddress ]);
        // console.log(colors);
        // await page.click('#header-login-btn');
        // await page.$eval('#nav-main-search', (form) => form.submit());
        // page.close();
        // browser.close();
    });
};

puppeteerPage();
