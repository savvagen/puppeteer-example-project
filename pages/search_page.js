const WebPage = require('./web_page');
const puppeteer = require('puppeteer');
const ResultPage = require('./result_page');

class SearchPage {

    constructor(page, title = "Google", url = "http://google.com") {
        this.page = page;
        this.title = title;
        this.url = url;
        this.searchField = '*[name="q"]'
    }

    async open() {
        return await this.page.goto(this.url)
    }

    get getTitle(){
        return this.page.title;
    }

    async searchFor(text){
        await this.page.type(this.searchField, text);
        await this.page.keyboard.press('Enter');
        return new ResultPage();
    }


}
module.exports = { SearchPage };
