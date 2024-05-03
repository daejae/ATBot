import config from '../../config.js';
import { StockBuyResponse, StockPriceResponse } from '../../types/api.js';
import apiClient from '../apiClient.js';

export const orderStock = async (data: {
  orderPrice: string;
  ticker: string;
  quantity: string;
  orderExchangeCode: string;
}): Promise<StockBuyResponse> => {
  const body = {
    CANO: config.accountNumber,
    ACNT_PRDT_CD: '01',
    OVRS_EXCG_CD: data.orderExchangeCode,
    PDNO: data.ticker,
    ORD_QTY: data.quantity,
    OVRS_ORD_UNPR: data.orderPrice, // 시장가
    ORD_SVR_DVSN_CD: '0',
    ORD_DVSN: '00', // 지정가
  };

  const response = await apiClient.post(
    '/uapi/overseas-stock/v1/trading/order',
    body,
    {
      headers: {
        tr_id: 'TTTT1002U',
      },
    },
  );

  // result
  // {
  //   rt_cd: '0',
  //   msg_cd: 'APBK0013',
  //   msg1: '주문 전송 완료 되었습니다.',
  //   output: {
  //     KRX_FWDG_ORD_ORGNO: '01790',
  //     ODNO: '0030292609',
  //     ORD_TMD: '045952'
  //   }
  // }
  return response.data;
};

export const getCurrentStockPrice = async (data: {
  ticker: string;
  exchangeCode: string;
}): Promise<StockPriceResponse> => {
  const response = await apiClient.get(
    '/uapi/overseas-price/v1/quotations/price',
    {
      headers: {
        tr_id: 'HHDFS00000300',
      },
      params: {
        AUTH: '',
        EXCD: data.exchangeCode,
        SYMB: data.ticker,
      },
    },
  );
  return response.data;
};
