import { Head } from "@inertiajs/react";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";

export default function HomeLayout({
    children,
    currentYear,
    openShoppingCart,
    isCartOpen,
}) {
    return (
        <>
            <Head title="logoIpsum Shop" />
            <Header
                openShoppingCart={openShoppingCart}
                isCartOpen={isCartOpen}
            />
            <main className="bg-body-color min-h-[90vh] flex flex-col items-center overflow-hidden">
                {children}
            </main>
            <Footer currentYear={currentYear} />
        </>
    );
}
