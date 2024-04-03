import HomeLayout from "@/Layouts/HomeLayout";
import Product from "@/Components/Shop/Product";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct } from "@/features/product/productSlice";
import { useRef, useState } from "react";
import { Link } from "@inertiajs/react";
import { loadState, removeItem } from "@/Components/Shop/localStorage";

export const getTotalCost = () => {
    const newProducts = loadState();
    if (!newProducts) return 0;
    const initialValue = 0;
    const totalCost = newProducts.reduce(
        (accumulator, product) =>
            accumulator + product.quantity * product.price,
        initialValue
    );
    return totalCost;
};

export default function Shop({ products, currentYear }) {
    let savedProducts = loadState();
    const productsInStore = useSelector((state) => state.product);
    const dispatch = useDispatch();
    const [openCart, setOpenCart] = useState(false);
    const cartContainer = useRef(null);
    const productContainer = useRef(null);

    const openShoppingCart = (trigger) => {
        if (trigger) {
            setOpenCart(true);
            cartContainer.current.classList.remove("hidden");
            cartContainer.current.classList.remove("animate-closeCart");
            cartContainer.current.classList.add("animate-openCart");
        } else {
            setOpenCart(false);
            cartContainer.current.classList.remove("animate-openCart");
            cartContainer.current.classList.add("animate-closeCart");
            setTimeout(() => {
                cartContainer.current.classList.add("hidden");
            }, 300);
        }
    };

    return (
        <HomeLayout
            openShoppingCart={openShoppingCart}
            isCartOpen={openCart}
            currentYear={currentYear}
        >
            <main className="flex w-full min-h-[90vh] justify-center items-center">
                <div className="flex flex-col items-center w-[75%]" ref={productContainer}>
                    <div className="w-full px-5 flex flex-col items-center">
                        <h1 className="text-3xl mt-5 font-bold">
                            logoIpsum Shop
                        </h1>
                        <h2 className="text-lg sm:text-xl md:text-2xl mt-2 mb-5 mx-5 text-center">
                            Greetings! You are welcome to browse our wide 
                            selection of quality products.
                        </h2>
                    </div>
                    <div className="product-container">
                        <div className="flex flex-col md:flex-row">
                            {products &&
                                products.map((product) => (
                                    <Product
                                        key={product.id}
                                        productId={product.id}
                                        name={product.name}
                                        price={product.price}
                                        image={product.image}
                                    />
                                ))}
                        </div>
                    </div>
                    <Link
                        href={route("home")}
                        className="text-2xl hover:text-footer-color font-bold underline decoration-4 my-5 decoration-footer-color"
                    >
                        Go home
                    </Link>
                </div>
                <div
                    className="absolute bg-white w-[300px] max-h-[90vh] hidden cart-container right-0 top-14 z-0 ml-5 shadow-lg"
                    ref={cartContainer}
                >
                    <div className="pt-10 px-5 flex flex-col min-w-[200px] justify-between">
                        <h1 className="text-2xl font-bold mb-5">
                            Shopping cart
                        </h1>
                        <div className="min-h-[300px] max-h-[70vh] overflow-y-auto">
                            {savedProducts &&
                                savedProducts.map((product, key) => (
                                    <div
                                        key={product.id}
                                        className="results flex flex-col items-center mb-3"
                                    >
                                        <h2 className="text-lg font-bold mb-1 text-center">
                                            {product.name}
                                        </h2>
                                        <img
                                            className="w-[150px] rounded"
                                            src={product.image}
                                            alt={`${product.name} product`}
                                        />
                                        <p className="font-bold mt-1">
                                            {product.quantity}x ${product.price}
                                        </p>
                                        <button
                                            className="text-red-500"
                                            onClick={() => {
                                                dispatch(
                                                    removeProduct(product.id)
                                                );
                                                removeItem(product.id);
                                                savedProducts = productsInStore;
                                            }}
                                        >
                                            x Remove
                                        </button>
                                        {key !== savedProducts.length - 1 ? (
                                            <hr className="w-full mt-2 border-input-border border-1" />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                ))}
                            {!savedProducts || savedProducts.length === 0 ? (
                                <h1 className="text-xl">
                                    There are no products in the cart
                                </h1>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="total min-h-[4vh]">
                            <hr className="w-full border-input-border border-2" />
                            <h1 className="text-xl font-bold mt-2">
                                Total: ${getTotalCost().toFixed(2)}
                            </h1>
                            <div className="mt-3 mb-5 flex flex-col items-center">
                                <Link
                                    href={route("checkout")}
                                    className="self-center items-center bg-transparent border-4 text-center border-footer-color text-footer-color rounded-md hover:text-white hover:bg-footer-color uppercase focus:footer-color focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-150 px-5 py-2 font-bold text-md"
                                >
                                    Go to checkout
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </HomeLayout>
    );
}
