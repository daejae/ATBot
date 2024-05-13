import { PrismaClient } from '@prisma/client';
import { getDate } from '../utils/localtime.js';

export default class OrderRepositorie {
  private prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  async getTodayOrders(data : {
    ticker : string
  }) {
    const dateTime = getDate();

    return await this.prisma.order.findMany({
      where: {
        createAtNewYork: {
          gte: dateTime.newYorkTime.startOf('day').format(),
        },
        ticker : data.ticker
      },
    });
  }

  async createOrder(data: {
    createAtNewYork: string;
    ticker: string;
    orderQuantity : number;
    diffRate : number;
    price : number;
  }) {
    return await this.prisma.order.create({
      data: data,
    });
  }
}
