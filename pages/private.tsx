import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

import Shell from "@components/Shell";

export default function Manage() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
//   return (
//     <Shell>
//       <div className="pt-8">
//         <Link href="/api/auth/signout">
//           {/* this is the default next-auth sign-out template. */}
//           <a className="p-1 ml-2 text-white bg-blue-800">LOGOUT</a>
//         </Link>
//         <h1 className="py-4 text-3xl font-bold">You are signed in.</h1>
//       </div>
//     </Shell>
//   );
// }
