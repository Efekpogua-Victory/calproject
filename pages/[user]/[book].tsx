/* eslint-disable prettier/prettier */
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

import Input from "@components/Input";
import TextArea from "@components/TextArea";

const Book = () => {
  const [booking, setBookingDate] = useState("");
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Meet with grand - victory efekpogua</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="w-full h-screen p-10 bg-gray-100">
        <div className="container mt-20">
          <div className="row">
            <div className="p-3 bg-white col md:col-8 md:offset-2">
              <div className="row">
                <div className="col md:col-6">
                  <p className="text-dark text-md">Efekpogua Victory</p>
                  <h1 className="text-3xl font-bold text-dark">Meet with grannt</h1>
                  <p>15 Minutes</p>
                </div>
                <div className="pt-6 text-center col md:col-6">
                  <input
                    type="datetime-local"
                    name="bookingdate"
                    value={booking}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="p-2 text-black bg-white border-2 rounded-sm"
                  />
                </div>
              </div>
              {booking !== "" && (
                <div className="row">
                  <div className="col md:col-8 md:offset-2">
                    <form action="">
                      <div className="mb-3 form-group">
                        <label htmlFor="name">Your name</label>
                        <Input type="text" value="" required={true} name="name" placeholder="John Doe" />
                      </div>
                      <div className="mb-3 form-group">
                        <label htmlFor="email">Email address</label>
                        <Input
                          type="text"
                          value=""
                          required={true}
                          name="email"
                          placeholder="you@example.com"
                        />
                      </div>
                      <div className="mb-3 form-group">
                        <label htmlFor="note">Additional notes</label>
                        <TextArea
                          name="note"
                          placeholder="Please share anything that will help prepare for the meeting"
                        />
                      </div>
                      <div className="my-3 form-group">
                        <button type="submit" className="mr-3 bg-black rounded-none btn">
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
