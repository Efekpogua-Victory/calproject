/* eslint-disable prettier/prettier */
import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

import prisma from "@helpers/prisma";

const Book = (props: any) => {
  const router = useRouter();
  const [bookingdate, setBookingDate] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const eventtype = props.event.id;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const placebooking = (e: any) => {
    e.preventDefault();
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    return axios
      .post("/api/booking/book", {
        name,
        email,
        note,
        eventtype,
        bookingdate,
      })
      .then((response) => {
        router.replace(`/bookings/success/${response.data.data.id}`);
      })
      .catch((e) => {
        setIsSubmitting(false);
        const errorMessage = e.response?.data?.message;
        console.log(errorMessage || e.message);
      });
  };

  return (
    <>
      <Head>
        <title>
          {props.event.title} - {props.event.user.name}
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="w-full h-screen p-10 bg-gray-100">
        <div className="container mt-18">
          <div className="row">
            <div className="p-3 bg-white col md:col-8 md:offset-2">
              <div className="row">
                <div className="col md:col-6">
                  <p className="text-dark text-md">{props.event.user.name}</p>
                  <h1 className="text-3xl font-bold text-dark">{props.event.title}</h1>
                  <p>{props.event.length} Minutes</p>
                </div>
                <div className="pt-6 text-center col md:col-6">
                  <input
                    type="datetime-local"
                    name="bookingdate"
                    value={bookingdate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="p-2 text-black bg-white border-2 rounded-sm"
                  />
                </div>
              </div>
              {bookingdate !== "" && (
                <div className="row">
                  <div className="col md:col-8 md:offset-2">
                    <form action="" onSubmit={placebooking}>
                      <div className="mb-3 form-group">
                        <label htmlFor="name">Your name</label>
                        <input
                          type="text"
                          value={name}
                          required
                          name="name"
                          placeholder="John Doe"
                          onInput={(e) => setName(e.currentTarget.value)}
                          className="w-full px-4 py-2 mt-2 border rounded-none focus:outline-none focus:ring-1 focus:ring-black"
                        />
                      </div>
                      <div className="mb-3 form-group">
                        <label htmlFor="email">Email address</label>
                        <input
                          type="email"
                          value={email}
                          required
                          name="email"
                          placeholder="you@example.com"
                          onInput={(e) => setEmail(e.currentTarget.value)}
                          className="w-full px-4 py-2 mt-2 border rounded-none focus:outline-none focus:ring-1 focus:ring-black"
                        />
                      </div>
                      <div className="mb-3 form-group">
                        <label htmlFor="note">Additional notes</label>
                        <textarea
                          name="note"
                          required
                          className="w-full px-4 py-2 mt-2 border rounded-none focus:outline-none focus:ring-1 focus:ring-black"
                          onInput={(e) => setNote(e.currentTarget.value)}
                          placeholder="Please share anything that will help prepare for the meeting">
                          {note}
                        </textarea>
                      </div>
                      <div className="my-3 form-group">
                        <button
                          type="submit"
                          className="mr-3 bg-black rounded-none btn"
                          disabled={isSubmitting}>
                          Confirm
                        </button>
                        <button
                          type="button"
                          onClick={() => router.push("/")}
                          className="mr-3 rounded-none btn btn-outline">
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Book;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params.book;

  const event = await prisma.eventType.findFirst({
    where: {
      title_slug: slug,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  return {
    props: {
      event: event,
    },
  };
};
