/* eslint-disable prettier/prettier */
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";

const Header = () => {
    const { data: session } = useSession();
    return (
        <nav className="bg-black px-2 sm:px-4 py-2.5">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <Link href="/" >
                    <a className="flex items-center">
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                            Calc.com
                        </span>
                    </a>
                </Link>


                <div className="w-full md:block md:w-auto">
                    <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                        <li>
                            <Link href="#">
                                <a href="" className="block py-2 pr-4 pl-3 text-white  rounded" aria-current="page">
                                    Event Types
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="#">
                                <a href="" className="block py-2 pr-4 pl-3 text-white  rounded" aria-current="page">
                                    Bookings
                                </a>
                            </Link>
                        </li>
                        {session &&
                            <li>
                                <a
                                    href='#'
                                    onClick={(e) => { e.preventDefault(); signOut() }}
                                    className="block py-2 pr-4 pl-3 text-white  rounded"
                                    aria-current="page">
                                    Logout
                                </a>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
