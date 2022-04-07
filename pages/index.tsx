/* eslint-disable prettier/prettier */
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import WomanImage from '../public/lady.jpg'
import SignUpForm from "@components/SignUpForm"
import Head from "next/head";



export default function Index() {

  const { data: session } = useSession();

  return (

    <>
      <Head>
        <title>Cal.com - Schedule your success</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className="h-10 p-2 pr-3">
        <h1 className=" text-right font-extrabold">
          {session ? <Link href="/dashboard/overview">Go to Account</Link> : <Link href="/auth/login">Login</Link>}

        </h1>
      </header>
      <div className={`grid grid-cols-1 ${!session ? "gap-4 md:grid-cols-2" : "text-center"}  md:container md:mx-auto pt-10 `}>
        <div className="mt-11 p-3 pl-4 md:pl-8">
          <h3 className=" text-2xl mb-2">Cal.com</h3>
          <h1 className=" text-4xl font-bold md:text-5xl lg:text-6xl">You're are one step <br /> away from <br /> simpler <br /> scheduling.</h1>
          <p className={`${!session ? "text-left" : "text-center"} text-xs mt-4`}>"I love being able to use a tool that just works, and that it's open source. As a developer, i loved being empowered to contribute to a tool that is use regularly"</p>
          <div className=" relative mt-5">
            <div>
              <Image src={WomanImage} alt="Woman-face" className="h-10 w-10 rounded-full" width={30} height={30} />
              <span className=" mr-2">Cassidy Williams <span className=" text-blue-600">@cassido</span> </span>
              <p className="text-xs">Director of Developer Experience at Netlify</p>
            </div>
          </div>
        </div>
        <div className="mt-5 p-1 lg:px-24 sm:px-15">
          {!session && <SignUpForm />}
        </div>
      </div>
    </>
  )
}
