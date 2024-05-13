import prisma from "../src/prismaClient.js"

describe("Prisma Clien 테스트", ()=>{
  beforeAll(async ()=>{
    await prisma.$connect();
  });

  beforeAll(async ()=>{
    await prisma.$disconnect();
  });

  test("case 1", ()=>{
    expect("").toEqual("")
  })
})
