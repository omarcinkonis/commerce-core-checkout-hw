import { loadState, removeItem } from "./localStorage";
import { getTotalCost } from "@/Pages/Shop";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct } from "@/features/product/productSlice";
import { Link } from "@inertiajs/react";
import { useState, useRef } from "react";
import { useMediaQuery } from "react-responsive";

export default function OrderDetails() {
    let savedProducts = loadState();
    const productsInStore = useSelector((state) => state.product);
    const dispatch = useDispatch();
    const [orderVisible, setOrderVisible] = useState(true);
    const orderContainer = useRef(null);
    const isTablet = useMediaQuery({ query: `(max-width: 1024px)` });

    if (!isTablet && orderContainer.current !== null) {
        //Show order details on load
        orderContainer.current.classList.remove("hidden");
        orderContainer.current.classList.add("visible");
    }

    if (isTablet && !orderVisible && orderContainer.current !== null) {
        orderContainer.current.classList.add("hidden");
    }

    return (
        <div>
            <div className="visible lg:hidden bg-white">
                <div className="p-5 flex items-center justify-between">
                    <div
                        className="flex items-center cursor-pointer"
                        onClick={() => {
                            if (isTablet) {
                                let isVisible = orderVisible;
                                isVisible = !isVisible;
                                setOrderVisible(isVisible);
                            }
                        }}
                    >
                        <svg
                            width="25"
                            viewBox="0 0 29 26"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-3"
                        >
                            <path
                                d="M9.76539 24.6287C10.3968 24.6287 10.9087 24.1168 10.9087 23.4854C10.9087 22.8539 10.3968 22.342 9.76539 22.342C9.13395 22.342 8.62207 22.8539 8.62207 23.4854C8.62207 24.1168 9.13395 24.6287 9.76539 24.6287Z"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M25.0098 24.6287C25.6412 24.6287 26.1531 24.1168 26.1531 23.4854C26.1531 22.8539 25.6412 22.342 25.0098 22.342C24.3783 22.342 23.8665 22.8539 23.8665 23.4854C23.8665 24.1168 24.3783 24.6287 25.0098 24.6287Z"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M1 1H5.37443L8.65526 19.2931H26.153"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M8.48141 14.7198H25.2092C25.3332 14.7199 25.4535 14.6772 25.5495 14.599C25.6455 14.5208 25.7112 14.412 25.7356 14.291L27.667 4.68709C27.6825 4.60964 27.6806 4.52973 27.6614 4.4531C27.6422 4.37648 27.6061 4.30506 27.5557 4.244C27.5053 4.18294 27.442 4.13375 27.3702 4.1C27.2984 4.06625 27.2199 4.04877 27.1405 4.04883H6.33545"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <h1 className="text-xl uppercase font-bold mr-3">
                            Order Summary
                        </h1>
                        <svg
                            width="15"
                            viewBox="0 0 31 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`${
                                orderVisible ? "rotate-0 " : "rotate-90"
                            } transition-all`}
                        >
                            <path
                                d="M1.62617 17.574C2.04911 17.9968 2.62268 18.2343 3.22072 18.2343C3.81877 18.2343 4.39233 17.9968 4.81528 17.574L15.9794 6.40984L27.1436 17.574C27.569 17.9848 28.1387 18.2122 28.73 18.207C29.3214 18.2019 29.8871 17.9647 30.3052 17.5465C30.7234 17.1284 30.9606 16.5627 30.9657 15.9713C30.9709 15.38 30.7435 14.8103 30.3327 14.3849L17.574 1.62617C17.151 1.20335 16.5775 0.96582 15.9794 0.96582C15.3814 0.96582 14.8078 1.20335 14.3849 1.62617L1.62617 14.3849C1.20335 14.8078 0.96582 15.3814 0.96582 15.9794C0.96582 16.5775 1.20335 17.151 1.62617 17.574Z"
                                fill="black"
                            />
                        </svg>
                    </div>
                    <p className="text-xl font-bold">
                        ${getTotalCost().toFixed(2)}
                    </p>
                </div>
                <hr />
            </div>
            <div
                ref={orderContainer}
                className={`${
                    orderVisible ? "visible" : "hidden"
                } transition-all w-full lg:visible absolute lg:static shadow-lg lg:shadow-none flex flex-col justify-between bg-white py-3`}
            >
                <div className=" h-[160px] max-h-[160px] lg:min-h-[75vh] lg:max-h-[75vh] overflow-y-auto">
                    {savedProducts &&
                        savedProducts.map((product, key) => (
                            <div
                                key={product.id}
                                className="results flex flex-col items-start mt-3 lg:mt-10 w-full px-5 lg:w-[80%] mx-auto mb-3"
                            >
                                <div className="flex justify-between items-center lg:my-5 w-full">
                                    <img
                                        className="w-[60px] lg:w-[100px] rounded"
                                        src={product.image}
                                        alt={`${product.name} product`}
                                    />
                                    <div className="flex flex-col justify-center items-start">
                                        <h2 className="text-md lg:text-lg font-bold mb-1 text-center">
                                            {product.quantity}x {product.name}
                                        </h2>
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
                                    </div>

                                    <h2 className="text-lg font-bold mb-1 text-center">
                                        ${product.price}
                                    </h2>
                                </div>
                                {savedProducts &&
                                key !== savedProducts.length - 1 ? (
                                    <hr className="w-full mt-2 border-input-border" />
                                ) : (
                                    ""
                                )}
                            </div>
                        ))}
                    {!savedProducts || savedProducts.length === 0 ? (
                        <div className="p-10 flex flex-col items-center">
                            <h1 className="text-xl mb-3">
                                There are no products in the cart
                            </h1>
                            <Link
                                href={route("shop")}
                                className="inline-flex items-center bg-transparent border-4 border-footer-color text-footer-color rounded-md hover:text-white hover:bg-footer-color uppercase focus:footer-color focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-150 px-5 py-2 font-bold text-md"
                            >
                                Go back to shop
                            </Link>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
                <div className="w-full px-5 lg:w-[80%] mx-auto flex flex-col">
                    <hr className="w-full mt-2 border-input-border border-2 lg:mb-5" />
                    <div className="flex justify-between">
                        <p className="text-xl font-bold mt-2">Total:</p>
                        <p className="text-xl font-bold mt-2">
                            ${getTotalCost().toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
