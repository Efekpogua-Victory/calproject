/* eslint-disable prettier/prettier */
import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@helpers/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return;
  }
  const data = req.body;
  const { eventtype, bookingdate, name, email, note } = data;

  try {
    const booking = await prisma.booking.create({
      data: {
        booking_date: bookingdate,
        event_type_id: eventtype,
        attendee: {
          create: {
            name: name,
            email: email,
            extra_note: note,
          },
        },
      },
    });

    res.status(201).json({ message: "Booking successful", data: booking });
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: "Error occured while adding a new data." });
  }
}
