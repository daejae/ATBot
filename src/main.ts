import { getCurrentStockPrice, orderStock } from './api/index.js';
import prisma from './prismaClient.js';
import OrderRepositorie from './repositories/orderRepositorie.js';
import TokenRepositorie from './repositories/tokenRepositorie.js';
import { getTodayLastBuyRate } from './service.js';
import { getDate, isOpenMarket } from './utils/localtime.js';

const targetStock: {
  ticker: string;
  orderExchangeCode: string;
  exchangeCode: string;
  quantity: string;
}[] = [
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

const main = async () => {
  try {
    if (isOpenMarket() == false) return;

    for (const info of targetStock) {
      const currentStockPrice = await getCurrentStockPrice({
        ticker: info.ticker,
        exchangeCode: info.exchangeCode,
      });

      if(currentStockPrice.msg_cd == "EGW00123"){
        // token 만료
        console.log("토큰 만료, 기존 토큰 삭제처리");
        const tokenRepositorie = new TokenRepositorie(prisma);
        const deleteResult = await tokenRepositorie.deleteToken();
        console.log(deleteResult);
        continue;
      }

      if(currentStockPrice.rt_cd != "0") {
        console.log("현재가 조회 실패 / ", currentStockPrice );
        continue;
      }

      const currentRate = parseFloat(currentStockPrice.output.rate);
      const orderRate = await getTodayLastBuyRate({
        ticker: info.ticker,
      });

      const currentRateCeil = Math.ceil(currentRate);
      const orderRateCeil = Math.ceil(orderRate);

      console.log(`${info.ticker} / ${currentRate} / ${orderRateCeil}`);

      if (currentRateCeil >= orderRateCeil) continue;

      const orderResult = await orderStock({
        orderPrice: currentStockPrice.output.last,
        ticker: info.ticker,
        orderExchangeCode: info.orderExchangeCode,
        quantity: info.quantity,
      });

      // 주문 실패
      if (orderResult.rt_cd != '0') {
        console.log('주문 실패');
        console.log(orderResult);
        continue;
      }

      const orderrepositorie = new OrderRepositorie(prisma);
      await orderrepositorie.createOrder({
        createAtNewYork: getDate().newYorkTime.format(),
        diffRate: parseFloat(currentStockPrice.output.rate),
        orderQuantity: +info.quantity,
        ticker: info.ticker,
      });

      console.log(orderResult);

      console.log('cal');
    }
  } catch (error) {
    console.log(error);
  }
};

let isRun = false;
setInterval(async () => {
  if (isRun == false) {
    isRun = true;
    await main();
    isRun = false;
  }
}, 10000);

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
