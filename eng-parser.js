const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://multiplex.ua/cinema/dnipro/dafi_imax');
    const resultsSelector = '.info .title';
    await page.waitForSelector(resultsSelector);

    const links = await page.evaluate(resultsSelector => {
        const titles = Array.from(document.querySelectorAll(resultsSelector));
        return titles.map(anchor => {
            const title = anchor.textContent.split('|')[0].trim();
            return `${title} - ${anchor.href}`;
        });
    }, resultsSelector);
    
    console.log(links);

    await browser.close();
})();