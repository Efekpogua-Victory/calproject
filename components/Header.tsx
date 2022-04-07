/* eslint-disable prettier/prettier */

const Header = () => {
    return (
        <nav className="bg-black px-2 sm:px-4 py-2.5">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <a href="" className="flex items-center">
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                        Calc.com
                    </span>
                </a>

                <div className="w-full md:block md:w-auto">
                    <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                        <li>
                            <a
                                href="#"
                                className="block py-2 pr-4 pl-3 text-white  rounded"
                                aria-current="page">
                                Event Types
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 pr-4 pl-3 text-white  rounded"
                                aria-current="page">
                                Bookings
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 pr-4 pl-3 text-white  rounded"
                                aria-current="page">
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
