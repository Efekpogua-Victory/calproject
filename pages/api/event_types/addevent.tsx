/* eslint-disable prettier/prettier */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import prisma from "@helpers/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (session) {
    if (req.method !== "POST") {
      return;
    }

    const data = req.body;

    try {
      await prisma.event.create({
        data: {},
      });
    } catch (err) {
      console.log(err);
      res.status(403).json({ err: "Error occured while adding a new food." });
    }

    res.status(201).json({ message: "Event Added" });
  }
}
