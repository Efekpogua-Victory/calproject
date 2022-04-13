/* eslint-disable prettier/prettier */
import axios from "axios";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import WomanImage from "../public/lady.jpg";

export default function Index() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: session } = useSession();

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    const formatName = name.toLowerCase();
    const fname = formatName.replaceAll(" ", "-");
    const randomString = (Math.random() + 1).toString(36).substring(7);
    const slug = fname + "-" + randomString;

    return axios
      .post("/api/auth/signup", {
        name,
        email,
        slug,
        password,
      })
      .then(() => {
        alert("success");
        window.location.replace("/event-types");
      })
      .catch((e) => {
        setIsSubmitting(false);
        const errorMessage = e.response?.data?.message;
        alert(errorMessage || e.message);
      });
  }

  return (
    <>
      <Head>
        <title>Cal.com - Schedule your success</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className="h-10 p-2 pr-3">
        <h1 className="font-extrabold text-right ">
          {session ? <Link href="/event-types">Go to Account</Link> : <Link href="/auth/login">Login</Link>}
        </h1>
      </header>
      <div
        className={`grid grid-cols-1 ${
          !session ? "gap-4 md:grid-cols-2" : "text-center"
        }  md:container md:mx-auto pt-10 `}>
        <div className="p-3 pl-4 mt-11 md:pl-8">
          <h3 className="mb-2 text-2xl ">Cal.com</h3>
          <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
            You&apos;re are one step <br /> away from <br /> simpler <br /> scheduling.
          </h1>
          <p className={`${!session ? "text-left" : "text-center"} text-xs mt-4`}>
            {" "}
            &quot; I love being able to use a tool that just works, and that it&apos;s open source. As a
            developer, i loved being empowered to contribute to a tool that is use regularly &quot;
          </p>
          <div className="relative mt-5 ">
            <div>
              <Image
                src={WomanImage}
                alt="Woman-face"
                className="w-10 h-10 rounded-full"
                width={30}
                height={30}
              />
              <span className="mr-2 ">
                Cassidy Williams <span className="text-blue-600 ">@cassido</span>{" "}
              </span>
              <p className="text-xs">Director of Developer Experience at Netlify</p>
            </div>
          </div>
        </div>
        <div className="p-1 mt-5 lg:px-24 sm:px-15">
          {!session && (
            <>
              <div className="box-border p-2 border-2 shadow-md">
                <div className="p-4 text-left md:p-7">
                  <h1 className="font-sans text-2xl font-extrabold ">Start your 14-day free trial</h1>
                  <p>
                    <strong>No credit card required</strong> Try all pro features for 14 days. Upgrade at
                    anytime to Pro for $12/month.
                  </p>
                  <br />
                  <hr />
                </div>
                <div className="p-2 mb-5">
                  <form method="post" onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="block">Fullname</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onInput={(e) => setName(e.currentTarget.value)}
                        placeholder="john@test.com"
                        className="w-full px-4 py-2 mt-2 border rounded-none focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block">Email</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onInput={(e) => setEmail(e.currentTarget.value)}
                        placeholder="john@test.com"
                        className="w-full px-4 py-2 mt-2 border rounded-none focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>

                    <div className="mt-4">
                      <label className="block">Password</label>
                      <input
                        type="password"
                        required
                        value={password}
                        onInput={(e) => setPassword(e.currentTarget.value)}
                        className="w-full px-4 py-2 mt-2 border rounded-none focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>

                    <div className="mt-5">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="block w-full px-6 py-2 text-white bg-black rounded-none">
                        Sign up
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="p-3 bg-slate-100">
                <p className="text-center text-gray-500 ">
                  By signing up you agree to our
                  <a href="#" className="font-bold text-black">
                    Terms of Service
                  </a>
                  and
                  <a href="#" className="font-bold text-black">
                    Privacy Policy
                  </a>
                  . Need help?
                  <a href="#" className="font-bold text-black">
                    Get in touch
                  </a>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
