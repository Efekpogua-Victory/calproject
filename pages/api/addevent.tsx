/* eslint-disable prettier/prettier */
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return;
  }
  const prisma = new PrismaClient();

  const data = req.body;

  await prisma.eventType.create({
    data: data,
  });

  res.status(201).json({ message: "Event Added" });
};

export default handler;
