/* eslint-disable prettier/prettier */
import { GetServerSidePropsContext } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";

import prisma from "@helpers/prisma";

import Layout from "@components/Layout";

const EventTypes = (props: any) => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Home | Cal.com</title>
      </Head>
      <Layout>
        <div className="w-full h-screen p-10 bg-gray-100">
          <div className="grid grid-rows-3">
            <div>
              <p>
                Logged in as: <span className="font-bold text-black mb-2">{session?.user?.email}</span>
              </p>
              <h4 className="inline text-lg font-bold">Event Types</h4>

              <p className="text-gray-400">Create events to share for people to book on your calendar.</p>
            </div>
            {props.events.map((event: any) => (
              <div className="p-4 mt-3 bg-white" key={event.id}>
                <h5 className="font-bold text-md">{event.title}</h5>
                <p className="text-gray-400">{event.description}</p>
                <div className="block">
                  <p className="inline mr-2 font-bold text-dark">{event.length} Minutes</p>
                  <p className="inline mr-2 font-bold text-dark">{event.location}</p>
                </div>
                <p>URL</p>
                <input
                  type="text"
                  name=""
                  className="border border-slate-400 w-full p-2"
                  id=""
                  value={event.url}
                  readOnly
                />
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default EventTypes;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  const { req } = context;
  const host = req.headers.host;

  const events = await prisma?.eventType.findMany({
    include: {
      user: {
        select: {
          name_slug: true,
        },
      },
    },
  });

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
      events: events.map((event) => ({
        title: event.title,
        description: event.description,
        location: event.location,
        length: event.length,
        id: event.id,
        url: `https://${host}/${event.user?.name_slug}/${event.title_slug}`,
      })),
    },
  };
}
