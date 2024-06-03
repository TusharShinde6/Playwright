import { test, expect } from '@playwright/test';
import {searchFlight,applyFilter,checkFilter} from './functions.spec'

test('TS-01-Flight search on flightnetwork.com', async ({ page }) => {
    await searchFlight(page, 'New Delhi', 'Mumbai');
    await applyFilter(page);
    console.log(`the Zero Filter applied`);
});

test('TS-02-Non-stopFlights', async ({ page }) => {
    await searchFlight(page, 'New Delhi', 'Mumbai');
    await page.click('//div[@role="radiogroup"]//label[contains(text(),"Nonstop flights")]');
    await applyFilter(page);
    await checkFilter(page,'Non-stopFlights','Stops');
});


test('TS-03-Maximum one stop', async ({ page }) => {
    await searchFlight(page, 'New Delhi', 'Mumbai');
    await page.click('//div[@role="radiogroup"]//label[contains(text(),"Maximum one stop")]');
    await applyFilter(page);
    await checkFilter(page,'Maximum one stop','Stops');

});

test('TS-04-Airlines and stops Filter',async ({page})=>{
    await searchFlight(page, 'New Delhi', 'Mumbai');
    await page.click('//div[@role="radiogroup"]//label[contains(text(),"Maximum one stop")]');
    await page.click('//input[@id="airlines-AI"]');
    await applyFilter(page);
    await checkFilter(page,'Maximum one stop','Stops');
    await checkFilter(page,'Airlines Filter','Airlines');

} )

test('TS-05-Airlines filter',async ({page})=>{
    await searchFlight(page, 'New Delhi', 'Mumbai');
    await page.click('//input[@id="airlines-AI"]');
    await applyFilter(page);
    await checkFilter(page,'Airlines Filter','Airlines');


})