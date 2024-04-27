import { PrismaClient } from "@prisma/client";

export default class TokenRepositorie {
  private prisma : PrismaClient

  constructor(prismaClient : PrismaClient) {
    this.prisma = prismaClient;
  }

  async getToken() {
    return await this.prisma.token.findFirst();
  }

  async upsertToken(data : { access_token : string; access_token_token_expired : Date; token_type:string}) {
    return await this.prisma.token.upsert({
      where : {
        id : 1
      },
      create : data,
      update : data
    })
  }
}
