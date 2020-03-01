const puppeteer = require('puppeteer');

const wait = time => new Promise(resolve => setTimeout(resolve, time * 1000))
const fs = require('fs');

let page
(async () => {
    const browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.goto('https://reference.medscape.com/drug-interactionchecker', { waitUntil: "domcontentloaded" });

    await wait(5)
    clear()
})();


async function clear(){ await page.evaluate(() => clearallmdic()) }

async function add(name) {
    await page.evaluate(() => document.querySelector('#MDICtextbox').value = '')
    await page.type('#MDICtextbox', name)
    await wait(0.5)
    await page.evaluate(() => document.querySelector('#MDICdrugs li a').click())
}

async function getCollisions() {
    return await page.evaluate(() => [...document.querySelectorAll('ul h4')].map(x => x.innerText))
}

module.exports = {
    async findColiding(drugs) {
        await clear()
        for (let drug of drugs) 
            await add(drug)
        await wait(.5)
        return await getCollisions()
    }
}