/* eslint-disable prettier/prettier */
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";

import prisma from "@helpers/prisma";

import Layout from "@components/Layout";

const Bookings = (props) => {
  console.log(props.bookings);
  return (
    <>
      <Head>
        <title>Bookings | Cal.com</title>
      </Head>
      <Layout>
        <div className="w-full h-full bg-gray-100 p-10">
          {props.bookings.map((booking) => (
            <div className="grid grid-rows-1" key={booking.id}>
              <div className="p-4 mt-3 bg-white">
                <p className=" text-sm text-gray-800 inline mr-10">
                  {new Date(booking.booking_date).toDateString()}
                </p>
                <h5 className="font-bold text-md block md:inline text-black"> {booking.event_type.title} </h5>
                {booking.attendee.map((who) => (
                  <p className="text-gray-400 md:block" key={who.id}>
                    {who.name}, {who.email}
                  </p>
                ))}
                <div className="block">
                  <p className="inline mr-2 font-bold text-dark">{booking.event_type.length} Minutes</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
};

export default Bookings;
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  const bookings = await prisma.booking.findMany({
    include: {
      attendee: true,
      event_type: true,
    },
  });
  return {
    props: {
      session: session,
      bookings: bookings,
    },
  };
}
