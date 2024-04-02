import puppeteer from "puppeteer";

let browser;
const WebScrapping =  async () => {
    const searchQuery = "who is Einstein?";

    browser = await puppeteer.launch();
    const [page] = await browser.pages();
    await page.setRequestInterception(true);
    page.on("request", request => {
      request.resourceType() === "document" ? 
        request.continue() : request.abort();
    });
    await page.goto("https://www.google.com/", {waitUntil: "domcontentloaded"});
    await page.waitForSelector('textarea[aria-label="Search"]', {visible: true});
    await page.type('textarea[aria-label="Search"]', searchQuery);
    await Promise.all([
      page.waitForNavigation({waitUntil: "domcontentloaded"}),
      page.keyboard.press("Enter"),
    ]);
    await page.waitForSelector(".LC20lb", {visible: true});
    const searchResults = await page.$$eval(".LC20lb", els => 
      els.map((e:any) => ({title: e.innerText, link: e.parentNode.href}))
    );
    console.log(searchResults);
    await browser.close();
};


export default WebScrapping;