import { test, expect } from '@playwright/test';
import { format } from 'path';

export async function searchFlight(page, from, to) {
    await page.goto('https://www.flightnetwork.com/');
    await page.waitForSelector('//label[contains(text(),"From")]');
    await page.fill('input[aria-label="From"]', from);
    await page.waitForTimeout(2000);
    await page.waitForSelector('//div[@class="css-1uv24kw"]')
    await page.keyboard.press('Enter');
    await page.keyboard.type(to);
    await page.waitForTimeout(2000);
    await page.keyboard.press('Enter');
    await page.waitForSelector('//div[@data-testid="date-time-animation-wrapper"]')
    await page.click('//div[@class="css-19b2kzd"]');
    await Promise.all([
        page.click('button[type="submit"][data-testid="searchForm-searchFlights-button"]'),
    ]);
    await page.waitForTimeout(2000);
    await page.waitForSelector('div[data-testid="tripDetails-title-TitleText"]');
    const url = page.url();
    expect(url).toContain('result');
    await page.click('//button[@data-testid="resultPage-toggleFiltersButton-button"]');
    await page.waitForTimeout(2000);
};

export async function applyFilter(page) {
    await page.click('//span[contains(text(),"Done")]');    
};

export async function checkFilter(page,filters,tag) {
    await page.evaluate(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    await page.waitForSelector(`//div[@class="css-1e5ktd0 ewhyijf4"]//div[contains(text(),"${tag}")]`);
    console.log(`the selected Filter "${filters}" is applied`);
}