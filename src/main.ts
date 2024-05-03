import { getCurrentStockPrice, orderStock } from './api/index.js';
import prisma from './prismaClient.js';
import OrderRepositorie from './repositories/orderRepositorie.js';
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
    quantity: '1',
  },
  {
    ticker: 'SOXL',
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

// (async () => {
// })();
