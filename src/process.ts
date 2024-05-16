import { getCurrentStockPrice, orderStock } from './api/index.js';
import prisma from './prismaClient.js';
import OrderRepositorie from './repositories/orderRepositorie.js';
import { getTodayLastBuyRate } from './service.js';
import { Stock } from './type.js';
import delay from './utils/delay.js';
import { getDate, isOpenMarket } from './utils/localtime.js';

const process = async (
  data: Stock[],
  eachItemDelay: number = 1000,
  loopDelay: number = 10000,
) => {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      // 개장여부 확인
      if (isOpenMarket() == false) {
        await delay(loopDelay);
        continue;
      }

      for (const stock of data) await processItem(stock, eachItemDelay);

      await delay(loopDelay);
    } catch (error) {
      console.log(error);
    }
  }
};

const processItem = async (stock: Stock, eachItemDelay: number) => {
  const currentStockPrice = await getCurrentStockPrice({
    ticker: stock.ticker,
    exchangeCode: stock.exchangeCode,
  });

  if (currentStockPrice.rt_cd != '0') {
    console.log('현재가 조회 실패 / ', currentStockPrice);
    return;
  }

  const currentRate = parseFloat(currentStockPrice.output.rate);
  const orderRate = await getTodayLastBuyRate({
    ticker: stock.ticker,
  });

  const currentRateCeil = Math.ceil(currentRate);
  const orderRateCeil = Math.ceil(orderRate);

  console.log(`${stock.ticker} / ${currentRate} / ${orderRateCeil}`);

  if (currentRateCeil >= orderRateCeil) return;

  const orderResult = await orderStock({
    orderPrice: currentStockPrice.output.last,
    ticker: stock.ticker,
    orderExchangeCode: stock.orderExchangeCode,
    quantity: stock.quantity,
  });

  // 주문 실패
  if (orderResult.rt_cd != '0') {
    console.log('주문 실패');
    console.log(orderResult);
    return;
  }

  const orderrepositorie = new OrderRepositorie(prisma);
  await orderrepositorie.createOrder({
    createAtNewYork: getDate().newYorkTime.format(),
    diffRate: parseFloat(currentStockPrice.output.rate),
    orderQuantity: +stock.quantity,
    ticker: stock.ticker,
    price: parseFloat(currentStockPrice.output.last),
  });

  console.log(orderResult);

  await delay(eachItemDelay);
};
export default process;
