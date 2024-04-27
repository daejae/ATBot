import config from '../src/config.js';

test('설정 속성은 비어 있지 않은 값이어야 함', () => {
  expect(config.url).toBeTruthy();
  expect(config.accountNumber).toBeTruthy();
  expect(config.appKey).toBeTruthy();
  expect(config.appSecret).toBeTruthy();
  expect(config.stockName).toBeTruthy();
  expect(config.stockMarket).toBeTruthy();
  expect(config.stockBuyQty).toBeTruthy();
});
