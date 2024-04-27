import config from "../../config.js";
import { AccountResponse } from "../../types/api.js";
import apiClient from "../apiClient.js";


export const getAccount = async () : Promise<AccountResponse> => {
  const response = await apiClient.get("/uapi/overseas-stock/v1/trading/inquire-balance", {
    headers : {
      'tr_id': 'TTTS3012R'
    },
    params : {
      "CANO": config.accountNumber,
      "ACNT_PRDT_CD": "01",
      "OVRS_EXCG_CD" : "NASD",
      "TR_CRCY_CD": "USD",
      "CTX_AREA_FK200" : "",
      "CTX_AREA_NK200" : "",
    }
  })

  return response.data;
};
