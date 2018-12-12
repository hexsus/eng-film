const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://multiplex.ua/cinema/dnipro/dafi_imax');
    const resultsSelector = '.info .title';
    await page.waitForSelector(resultsSelector);
    const dates = '.date';
    const urls = await page.evaluate((dates) => {
        return Array.from(document.querySelectorAll(dates)).map(date => {
            return date.href;
        });
    }, dates)
    
    const links = await page.evaluate(resultsSelector => {
        const titles = Array.from(document.querySelectorAll(resultsSelector));
        return titles.map(anchor => {
            const title = anchor.textContent.split('|')[0].trim();
            return `${title} - ${anchor.href}`;
        });
    }, resultsSelector);
    console.log(urls);
    
    console.log(links);

    await browser.close();
})();