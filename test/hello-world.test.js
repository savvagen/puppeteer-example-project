const puppeteer = require('puppeteer');
const {MyPage, SearchPage} =  require('../pages/search_page');

const options = {
    headless: false,
    slowMo: 10,
    timeout: 10000,
    args: ['--no-sandbox', `--window-size=${1920},${1080}`]
};

let browser;
let page;

beforeAll(async () => {
    browser = await puppeteer.launch(options);
    page = await browser.newPage();
    page.setViewport({ width: 1280, height: 920});
});

afterAll(async () => {
    await browser.close();
});


test('search test', async ()=>{
    let searchPage = new SearchPage(page);
    await searchPage.open();
    await searchPage.searchFor('Selenium');
});



//
// test('google search', async ()=> {
//     await page.goto('http://google.com');
//     await page.type("*[name='q']", 'Selenium');
//     await page.keyboard.press('Enter');
//     await page.waitFor('div.srg');
//     await page.screenshot({path: 'screens/google.png'})
// });

// test('google search', async ()=> {
//
//     await page.goto('http://google.com');
//     let el = await page.$("*[name='q']");
//     await el.type('Hello');
//     // await page.type("*[name='q']", 'Selenium');
//     await page.keyboard.press('Enter');
//     await page.waitFor('div.srg');
//     await page.screenshot({path: 'screens/google2.png', fullPage: true})
// });
//
