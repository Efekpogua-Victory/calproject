/* eslint-disable prettier/prettier */
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import Layout from "@components/Layout";
import Head from "next/head";
import Button from "@components/Button";
import Modal from "@components/Modal";
import { useState } from "react";
import Input from "@components/Input";
import TextArea from "@components/TextArea";

const EventTypes = () => {
    const [showModal, setShowModal] = useState(false);

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
                            <Button btype="button" styles="float-right text-white bg-black" onclick={() => setShowModal(true)}>
                                New Event Type
                            </Button>
                            <p className="text-gray-400">Create events to share for people to book on your calendar.</p>
                            {showModal &&
                                <Modal>
                                    <h4 className="text-lg font-bold ">Add a new event type</h4>
                                    <p className="leading-relaxed text-gray-400">Create a new event type for people to book times with.</p>
                                    <form action="" method="post">
                                        <div className="my-3 form-group">
                                            <label htmlFor="title">Title</label>
                                            <Input type="text" required={true} name="title" />
                                        </div>
                                        <div className="my-3 form-group">
                                            <label htmlFor="description">Title</label>
                                            <TextArea name="description" required={true} />
                                        </div>
                                        <div className="my-3 form-group">
                                            <label htmlFor="location">Location</label>
                                            <select name="location" className="w-full px-4 py-2 mt-2 border rounded-none focus:outline-none focus:ring-1 focus:ring-black">
                                                <option >In-person meeting</option>
                                                <option >In-person meeting</option>
                                                <option>Phone call</option>
                                                <option>Link meeting</option>
                                                <option>Google Meet</option>
                                            </select>
                                        </div>
                                        <div className="my-3 form-group">
                                            <label htmlFor="duration">Length</label>
                                            <Input type="number" required={true} name="duration" />
                                        </div>

                                        <div className="my-3 form-group">
                                            <button type="submit" className="float-right px-6 py-2 text-white bg-black rounded-none ">
                                                Continue
                                            </button>
                                            <Button btype="button" styles="text-black bg-white border mr-1 float-right" onclick={() => setShowModal(false)}>
                                                Cancel
                                            </Button>

                                        </div>
                                    </form>
                                </Modal>
                            }
                        </div>
                        <div>

                        </div>
                    </div>

                </div>
            </Layout>
        </>

    )
};

export default EventTypes;

export async function getServerSideProps(context: GetServerSidePropsContext) {

    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            },
        }
    }
    return {
        props: {
            session: session,
        },
    };
}
