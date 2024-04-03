import ApplicationLogo from "./ApplicationLogo";
import { loadState } from "./Shop/localStorage";

export default function Header({ openShoppingCart, isCartOpen }) {
    let newProducts = loadState();

    return (
        <header className="min-h-[5vh] flex items-center border-2">
            <div className="w-[90%] mx-auto flex items-center justify-between">
                <div className="logo-container">
                    <ApplicationLogo fillColor="#DC624E" width="250" />
                </div>
                {route().current() === "shop" ? (
                    <div className="cart relative top-1">
                        <div className="items-count bg-[#FF6363] rounded-[50%] text-white flex items-center justify-center text-sm w-[20px] absolute right-[-10px] top-[-10px]">
                            {(newProducts && newProducts.length) || 0}
                        </div>
                        <svg
                            width="29"
                            height="26"
                            viewBox="0 0 29 26"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="cursor-pointer"
                            onClick={() => {
                                isCartOpen = !isCartOpen;
                                openShoppingCart(isCartOpen);
                            }}
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
                    </div>
                ) : (
                    ""
                )}
            </div>
        </header>
    );
}
