import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";

import Layout from "@components/Layout";

/* eslint-disable prettier/prettier */
const Bookings = () => {
  return (
    <>
      <Head>
        <title>Bookings | Cal.com</title>
      </Head>
      <Layout>
        <div className="w-full h-screen p-10 bg-gray-100">
          <div className="grid grid-rows-1">
            <div className="p-4 mt-3 bg-white">
              <h5 className="font-bold text-md">Chat with Leo</h5>
              <p className="text-gray-400 md:inline">This is my description</p>

              <div className="block">
                <p className="inline mr-2 font-bold text-dark">20 Minutes</p>
                <p className="inline mr-2 font-bold text-dark">Google Meet</p>
              </div>
            </div>
          </div>
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
  return {
    props: {
      session: session,
    },
  };
}
