import Footer from "@/Components/Footer";
import { Head } from "@inertiajs/react";
import CheckoutForm from "@/Components/Shop/CheckoutForm";
import OrderDetails from "@/Components/Shop/OrderDetails";
export default function Checkout() {
    return (
        <>
            <Head title="Checkout" />
            <main className="min-h-[95vh] bg-body-color flex lg:flex-row flex-col-reverse w-full">
                <div className="order-details flex flex-col w-full min-h-[85vh] justify-center py-10 px-3 items-center">
                    <div className="flex flex-col w-full max-w-[800px]">
                        <h1 className="uppercase font-bold text-md mb-5">
                            Payment and shipping
                        </h1>
                        <CheckoutForm />
                    </div>
                </div>
                <div className="order-summary w-full lg:p-5 lg:w-6/12 lg:ml-5 lg:bg-white">
                    <OrderDetails />
                </div>
            </main>
            <Footer />
        </>
    );
}
