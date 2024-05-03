// config.ts
import 'dotenv/config';

interface Config {
  url: string;
  accountNumber: string;
  appKey: string;
  appSecret: string;
}

const config: Config = {
  url: process.env.API_BASE_URL,
  accountNumber: process.env.ACCOUNT_NUMBER,
  appKey: process.env.APP_KEY,
  appSecret: process.env.APP_SECRET,
};

export default config;
