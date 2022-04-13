/* eslint-disable prettier/prettier */
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";

import Button from "@components/Button";
import Layout from "@components/Layout";
import Modal from "@components/Modal";

const EventTypes = () => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [location, setLocation] = useState("");
  const [length, setLength] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const saveEvent = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);

    const formatName = title.toLowerCase();
    const fname = formatName.replaceAll(" ", "-");
    const randomString = (Math.random() + 1).toString(36).substring(7);
    const title_slug = fname + "-" + randomString;

    return axios
      .post("/api/addevent", {
        title,
        title_slug,
        description,
        location,
        length,
      })
      .then(() => {
        alert("Event saved successfully");
        setShowModal(false);
      })
      .catch((e) => {
        setIsSubmitting(false);
        const errorMessage = e.response?.data?.message;
        alert(errorMessage || e.message);
        console.log(e);
      });
  };

  return (
    <>
      <Head>
        <title>Home | Cal.com</title>
      </Head>
      <Layout>
        <div className="w-full h-screen p-10 bg-gray-100">
          <div className="grid grid-rows-3">
            <div>
              <h4 className="inline text-lg font-bold">Event Types</h4>
              <Button
                btype="button"
                styles="float-right text-white bg-black"
                onclick={() => setShowModal(true)}>
                New Event Type
              </Button>
              <p className="text-gray-400">Create events to share for people to book on your calendar.</p>
              {showModal && (
                <Modal>
                  <h4 className="text-lg font-bold ">Add a new event type</h4>
                  <p className="leading-relaxed text-gray-400">
                    Create a new event type for people to book times with.
                  </p>
                  <form action="" method="post" onSubmit={saveEvent}>
                    <div className="my-3 form-group">
                      <label htmlFor="title">Title</label>
                      <input
                        type="text"
                        required
                        name="title"
                        value={title}
                        onInput={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 mt-2 border rounded-none focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>
                    <div className="my-3 form-group">
                      <label htmlFor="description">Description</label>
                      <textarea
                        name="description"
                        required
                        value={description}
                        onInput={(e) => setDesc(e.target.value)}
                        className="w-full px-4 py-2 mt-2 border rounded-none focus:outline-none focus:ring-1 focus:ring-black"></textarea>
                    </div>
                    <div className="my-3 form-group">
                      <label htmlFor="location">Location</label>
                      <select
                        name="location"
                        className="w-full px-4 py-2 mt-2 border rounded-none focus:outline-none focus:ring-1 focus:ring-black"
                        value={location}
                        onInput={(e) => setLocation(e.target.value)}>
                        <option>In-person meeting</option>
                        <option>Phone call</option>
                        <option>Link meeting</option>
                        <option>Google Meet</option>
                      </select>
                    </div>
                    <div className="my-3 form-group">
                      <label htmlFor="duration">Length</label>
                      <input
                        type="number"
                        required
                        name="duration"
                        value={length}
                        onInput={(e) => setLength(e.target.value)}
                        className="w-full px-4 py-2 mt-2 border rounded-none focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>

                    <div className="my-3 form-group">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="float-right px-6 py-2 text-white bg-black rounded-none ">
                        Continue
                      </button>

                      <button
                        type="button"
                        className="float-right px-6 py-2 mr-1 text-black bg-white border rounded-none"
                        onClick={() => setShowModal(false)}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </Modal>
              )}
            </div>
            <div className="p-4 mt-3 bg-white">
              <h5 className="font-bold text-md">Chat with Leo</h5>
              <p className="text-gray-400 md:inline">This is my description</p>
              <div className="float-right md:inline justify">
                <a href="http://" className="mr-2 font-bold text-dark">
                  Edit
                </a>
                <a href="http://" className="mr-2 font-bold text-dark">
                  Share
                </a>
                <a href="http://" className="mr-2 font-bold text-red-600">
                  Delete
                </a>
              </div>
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

export default EventTypes;

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
