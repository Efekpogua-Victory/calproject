/* eslint-disable prettier/prettier */
import { GetServerSidePropsContext } from "next";
import { GetServerSideProps } from "next";
import { getCsrfToken, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { getSession } from "@helpers/auth";

import Link from 'next/link';
import Head from 'next/head';

interface ServerSideProps {
  csrfToken: string;
}


export default function Login({ csrfToken }: ServerSideProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const callbackUrl = typeof router.query?.callbackUrl === "string" ? router.query.callbackUrl : "/dashboard/overview";

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    const response = await signIn<"credentials">("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });


    if (!response) {
      throw new Error("Received empty response from next auth");
    }

    if (response.error) {
      setError("Email or password is incorrect");
      setIsSubmitting(false);
    } else {
      setError("");
    }

    if (!response.error) {
      // we're logged in! let's do a hard refresh to the desired url
      window.location.replace(callbackUrl);
      return;
    }
  }

  return (
    <>
      <Head>
        <title>Cal.com - Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
          <h1 className="text-3xl font-bold text-center">Cal.com</h1>
          <h1 className="text-3xl font-bold text-center">Sign in to your account</h1>
          <form method="POST" className="mt-4" onSubmit={handleSubmit}>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken || undefined} hidden />
            <small className=" text-red-700">{error}</small>
            <div className="mb-4">
              <label className="block">Email</label>
              <input
                type='email'
                required
                value={email}
                onInput={(e) => setEmail(e.currentTarget.value)}
                placeholder="john@test.com"
                className="w-full px-4 py-2 mt-2 border rounded-none focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div className="mt-4">
              <label className="block">Password</label>
              <span className="inline float-right">
                <Link href="/auth/register" className="text-sm text-blue-600 hover:underline">Forgot password?</Link></span>
              <input
                type='password'
                required
                value={password}
                onInput={(e) => setPassword(e.currentTarget.value)}
                className="w-full px-4 py-2 mt-2 border rounded-none focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div className="mt-4">
              <button type='submit' disabled={isSubmitting} className="block w-full px-6 py-2 text-white bg-black rounded-none">
                Sign in
              </button>
            </div>
          </form>
          <div className="p-3 ">
            <p className="text-center"> <span className="text-gray-500 ">Don't have an account?</span>  <Link href="/" className="font-bold text-black">Create account</Link> </p>
          </div>
        </div>

      </div>

    </>

  );

}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}