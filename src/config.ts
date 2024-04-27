// config.ts
import 'dotenv/config';

interface Config {
  url: string;
  accountNumber: string;
  appKey: string;
  appSecret: string;

  // 종목
  stockName :string;
  stockMarket : string;
  stockBuyQty : string;
}

const config: Config = {
  url: process.env.API_BASE_URL,
  accountNumber: process.env.ACCOUNT_NUMBER,
  appKey: process.env.APP_KEY,
  appSecret: process.env.APP_SECRET,

  stockName : process.env.STOCK_NAME,
  stockMarket : process.env.SOCKET_MARKET,
  stockBuyQty : process.env.STOCK_BUY_QTY,
};

export default config;
