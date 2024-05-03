import axios from 'axios';
import config from '../../config.js';
import prisma from '../../prismaClient.js';
import TokenRepositorie from '../../repositories/tokenRepositorie.js';
import { TokenResponse } from '../../types/api.js';

export const createToken = async (): Promise<TokenResponse> => {
  const data = JSON.stringify({
    grant_type: 'client_credentials',
    appkey: config.appKey,
    appsecret: config.appSecret,
  });

  const axiosConfig = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://openapi.koreainvestment.com:9443/oauth2/tokenP',
    headers: {
      'content-type': 'application/json',
    },
    data: data,
  };

  const response = await axios.request(axiosConfig);
  return response.data;
};

export const getToken = async() => {
  const tokenRepositorie = new TokenRepositorie(prisma);
  const currenToken = await tokenRepositorie.getToken();
  const currentDate = new Date((new Date).getTime() -(1 * 60 * 60 * 1000)); // 현재 시간에서 1시간 전

  if(currenToken && currenToken.access_token_token_expired > currentDate ){
    return `${currenToken.token_type} ${currenToken.access_token}`;
  }
  console.log(new Date());
  console.log("새로운 토큰");

  const newToken = await createToken();
  await tokenRepositorie.upsertToken({
    access_token : newToken.access_token,
    access_token_token_expired : new Date(newToken.access_token_token_expired),
    token_type: newToken.token_type
  });

  return `${newToken.token_type} ${newToken.access_token}`;
};
