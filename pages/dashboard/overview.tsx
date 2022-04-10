/* eslint-disable prettier/prettier */
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import Layout from "@components/Layout";

const Overview = () => {

    return (
        <>
            <Layout>

            </Layout>
        </>
    )
};

export default Overview;

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
