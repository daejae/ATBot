import process from './process.js';
import { Stock } from './type.js';

// API Docs
// https://apiportal.koreainvestment.com/intro

const targetStock: Stock[] = [
  {
    ticker: 'TQQQ',
    orderExchangeCode: 'NASD',
    exchangeCode: 'NAS',
    quantity: '2',
  },
  {
    ticker: 'SOXL',
    orderExchangeCode: 'AMEX',
    exchangeCode: 'AMS',
    quantity: '2',
  },
  {
    ticker: 'SCHD',
    orderExchangeCode: 'AMEX',
    exchangeCode: 'AMS',
    quantity: '1',
  },
];

process(targetStock, 1000, 10000);

// import puppeteer from 'puppeteer';
// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.goto(`https://www.isnasdaqopen.com/`);

//   // /html/body/main/div/p[1]
//     // page.$eval() 함수를 사용하여 지정된 셀렉터의 요소의 HTML을 반환합니다.
//     const htmlContent = await page.$eval('body > main > div > p:nth-child(1)', element => element.innerHTML);
//     console.log(htmlContent);

//   await browser.close();
// })();
