import axios, { AxiosError, AxiosResponse } from 'axios';
import config from '../config.js';
import { getToken } from './services/authSevice.js';
import TokenRepositorie from '../repositories/tokenRepositorie.js';
import prisma from '../prismaClient.js';

const apiClient = axios.create({
  baseURL: config.url,
  maxBodyLength: Infinity,
  timeout : 5000,
  headers: {
    'Content-Type': 'application/json',
    appkey: config.appKey,
    appsecret: config.appSecret,
  },
});

apiClient.interceptors.request.use(
  async (config) => {

    config.headers["authorization"] = await getToken();
    return config;
  }
);

apiClient.interceptors.response.use(
  (response:AxiosResponse)=>response,
  async (error:AxiosError<ErrorResponse>)=>{
    if (error.response) {
      // 서버가 응답을 했지만 상태 코드가 2xx 범위를 벗어남
      if (error.response.status === 500) {
        const errorData = error.response.data;
        if (errorData.msg_cd === 'EGW00123') {
          console.error('토큰 만료 에러:', errorData.msg1);
          const tokenRepositorie = new TokenRepositorie(prisma);
          console.log(await tokenRepositorie.deleteToken());
        } else {
          console.error('기타 500 에러:', errorData.msg1);
        }
      } else {
        console.error('응답 에러 데이터:', error.response.data);
      }
      console.error('응답 에러 상태:', error.response.status);
      console.error('응답 에러 헤더:', error.response.headers);
    } else if (error.request) {
      // 요청이 만들어졌지만 응답을 받지 못함
      console.error('요청 에러:', error.request);
    } else {
      // 요청 설정 중에 에러가 발생함
      console.error('설정 에러:', error.message);
    }

    return Promise.reject(error);
  }
)
interface ErrorResponse {
  rt_cd: string;
  msg_cd: string;
  msg1: string;
}


export default apiClient;
