import config from '../../config.js';
import apiClient from '../apiClient.js';

export const buyStock = async () => {
  const body = {
    CANO: config.accountNumber,
    ACNT_PRDT_CD: '01',
    OVRS_EXCG_CD: 'NASD',
    PDNO: config.stockName,
    ORD_QTY: config.stockBuyQty,
    OVRS_ORD_UNPR: '0', // 시장가
    ORD_SVR_DVSN_CD: '0',
    ORD_DVSN: '00', // 지정가
  };

  const response = await apiClient.post(
    '/uapi/overseas-stock/v1/trading/order',
    body,
    {
      headers: {
        // TTTT1002U : 미국 매수 주문
        // TTTT1006U : 미국 매도 주문
        tr_id: 'TTTT1002U',
      },
    },
  );
  return response.data;
};
