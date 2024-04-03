import { Link } from "@inertiajs/react";
import HomeLayout from "@/Layouts/HomeLayout";
import HomeIllustration from "@/Components/HomeIllustration";

export default function Welcome({ currentYear }) {
    return (
        <HomeLayout currentYear={currentYear}>
            <div className="max-w-7xl w-full min-h-[90vh] flex flex-col items-center justify-center">
                <h1 className="text-2xl md:text-3xl text-center">
                    Welcome to <span className="font-bold">logoIpsum Shop</span>
                    !
                </h1>
                <h2 className="text-xl md:text-2xl text-center mt-3 px-5">
                    Go ahead and browse our quality products by pressing the
                    button below
                </h2>
                <Link
                    href={route("shop")}
                    className="inline-flex mt-5 mb-10 items-center bg-transparent border-4 border-footer-color text-footer-color rounded-md hover:text-white hover:bg-footer-color uppercase focus:footer-color focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-150 px-5 py-2 font-bold text-sm sm:text-md md:text-lg lg:text-xl"
                >
                    Go to shop
                </Link>
                <HomeIllustration />
            </div>
        </HomeLayout>
    );
}
