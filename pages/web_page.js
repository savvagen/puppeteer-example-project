// const puppeteer = require('puppeteer');

class WebPage {

    constructor(page, title, url){
        this.page = page;
        this.title = title;
        this.url = url
    }

    async open() {
        return await this.page.goto(this.url)
    }

}
module.exports = WebPage;