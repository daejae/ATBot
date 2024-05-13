import prisma from './prismaClient.js';
import OrderRepositorie from './repositories/orderRepositorie.js';

export const getTodayLastBuyRate = async (data : {
  ticker : string
}) => {
  let maxRate = 0;

  const orderRepositorie = new OrderRepositorie(prisma);
  const orders = await orderRepositorie.getTodayOrders(data);
  if (orders.length > 0) {
    const maxorder = orders.reduce((prev, current) => {
      return current.diffRate < prev.diffRate ? current : prev;
    });
    maxRate = maxorder.diffRate;
  }

  return maxRate;
};
