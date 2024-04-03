import ApplicationLogo from "./ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Footer({ currentYear }) {
    return (
        <>
            <footer className="flex w-full mx-auto py-3 bg-footer-color min-h-[5vh]">
                <div className="w-[90%] mx-auto flex flex-col lg:flex-row justify-between items-center">
                    <div className="flex flex-col sm:flex-row lg:flex-row justify-between items-center space-y-2 sm:space-y-0">
                        <div className="mr-5">
                            <ApplicationLogo fillColor="#FFF" width="130" />
                        </div>
                        <nav className="flex justify-between text-white text-[0.9rem]">
                            <Link className="mr-3 opacity-[60%] hover:opacity-100 transition-all">
                                Terms Of Service
                            </Link>
                            <Link className="mr-3 opacity-[60%] hover:opacity-100 transition-all">
                                Privacy Policy
                            </Link>
                            <Link className="mr-3 opacity-[60%] hover:opacity-100 transition-all">
                                Returns
                            </Link>
                            <Link className="opacity-[60%] hover:opacity-100 transition-all">
                                FAQ
                            </Link>
                        </nav>
                    </div>
                    <div className="flex items-center justify-end ">
                        <p className="text-white text-[0.9rem] opacity-[60%] hover:opacity-100 transition-all">
                            &copy; {currentYear} Logoipsum. All rights reserved
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}
