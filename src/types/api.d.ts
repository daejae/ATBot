// authService
export interface TokenResponse {
  access_token : string;
  access_token_token_expired : string;
  token_type : string;
  expires_in : number;
}

// accountService
interface PortfolioData {
  cano: string;
  acnt_prdt_cd: string;
  prdt_type_cd: string;
  ovrs_pdno: string;
  ovrs_item_name: string;
  frcr_evlu_pfls_amt: string;
  evlu_pfls_rt: string;
  pchs_avg_pric: string;
  ovrs_cblc_qty: string;
  ord_psbl_qty: string;
  frcr_pchs_amt1: string;
  ovrs_stck_evlu_amt: string;
  now_pric2: string;
  tr_crcy_cd: string;
  ovrs_excg_cd: string;
  loan_type_cd: string;
  loan_dt: string;
  expd_dt: string;
}

interface PortfolioSummary {
  frcr_pchs_amt1: string;
  ovrs_rlzt_pfls_amt: string;
  ovrs_tot_pfls: string;
  rlzt_erng_rt: string;
  tot_evlu_pfls_amt: string;
  tot_pftrt: string;
  frcr_buy_amt_smtl1: string;
  ovrs_rlzt_pfls_amt2: string;
  frcr_buy_amt_smtl2: string;
}

export interface AccountResponse {
  output1: PortfolioData[];
  output2: PortfolioSummary;
  rt_cd: string;
  msg_cd: string;
  msg1: string;
}

// stock Service

export interface StockBuyResponse {
  rt_cd: string;    // 응답 코드
  msg_cd: string;   // 메시지 코드
  msg1: string;     // 상세 메시지
  output: {
    KRX_FWDG_ORD_ORGNO: string;  // 주문 기관 번호
    ODNO: string;               // 주문 번호
    ORD_TMD: string;            // 주문 시간
  };
}



export interface StockPriceResponse {
  output: {
    rsym: string;  // 심볼
    zdiv: string;  // 나누기 값 (문자열로 표현된 숫자)
    base: string;  // 기준 가격
    pvol: string;  // 이전 볼륨
    last: string;  // 최종 가격
    sign: string;  // 신호 또는 변화의 표시 (문자열로 표현된 숫자)
    diff: string;  // 가격 차이
    rate: string;  // 비율 (퍼센트로 표시)
    tvol: string;  // 오늘의 볼륨
    tamt: string;  // 오늘의 총액
    ordy: string;  // 주문 가능 여부
  };
  rt_cd: string;    // 응답 코드
  msg_cd: string;   // 메시지 코드
  msg1: string;     // 메시지 설명
}
