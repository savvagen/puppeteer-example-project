const { expect } = require('chai');
const puppeteer = require('puppeteer');
const _ = require('lodash');
const globalVariables = _.pick(global, ['browser', 'expect']);
const constants = require('../constants.json');
const width = constants.windowSize.width;
const height = constants.windowSize.height;
// puppeteer options
const opts = {
    headless: false,
    slowMo: 100,
    timeout: 10000,
    args: ['--no-sandbox', `--window-size=${width},${height}`]
};


describe('sample spec', function () {

    beforeAll (async function () {
        global.expect = expect;
        global.browser = await puppeteer.launch(opts);
        // Run test in one tab
        // global.page = await browser.newPage();
    });

    afterAll (function () {
        browser.close();
        global.browser = globalVariables.browser;
        global.expect = globalVariables.expect;
    });

    beforeEach(async function () {
        // Run everything in separated browsers
        // global.expect = expect;
        // global.browser = await puppeteer.launch(opts);
        // global.page = await browser.newPage();
        console.log(await browser.version());
        // Run test in different tabs
        global.page = await browser.newPage();
    });

    afterEach (async function () {
        // global.browser.close();
        // global.browser = globalVariables.browser;
        // global.expect = globalVariables.expect;
    });


    it('should open google', async function () {
        await page.goto(constants.url);
        expect(await page.title()).to.eq("Google");
    });

    it('should search in google', async function () {
        await page.goto(constants.url);
        let searchButton = "input[name='q']";
        await page.waitFor(searchButton);
        await page.type(searchButton, "Selenium is dead.");
        //await page.click('input[name="btnK"]');
        await page.keyboard.press('Enter');
        await page.waitFor('div.srg');
        const links = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('div.srg > div.g'));
        });
        expect(links.length).to.be.greaterThan(9);
        expect(links.length).to.be.equal(10)
    });

    it('should login', async function () {
        await page.goto("https://gmail.com");
        let emailField = "#identifierId";
        await page.waitForSelector(emailField);
        await page.type(emailField, 'savva.genchevskiy@gmail.com');
    });

});
