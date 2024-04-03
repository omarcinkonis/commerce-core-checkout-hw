import { Link } from "@inertiajs/react";
import { resetState } from "@/features/product/productSlice";

export default function OrderConfirmation() {
    localStorage.removeItem("state");
    resetState();
    return (
        <div className="flex flex-col min-h-[100vh] items-center justify-center">
            <h1 className="text-2xl sm:text-3xl xl:text-5xl font-bold mb-5 text-center">
                Thank you we have received your order.
            </h1>
            <h2 className="text-xl sm:text-2xl xl:text-3xl font-bold text-center">
                You will receive a confirmation email shortly.
            </h2>
            <Link
                href={route("shop")}
                className="text-xl sm:text-2xl xl:text-3xl hover:text-footer-color font-bold underline decoration-4 mt-3 decoration-footer-color"
            >
                Go back to shop
            </Link>
        </div>
    );
}
