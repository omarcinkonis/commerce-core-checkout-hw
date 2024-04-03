import { useForm } from "react-hook-form";
import { loadState } from "./localStorage";
import { getTotalCost } from "@/Pages/Shop";
import { useRef } from "react";
import axios from "axios";
import { Link } from "@inertiajs/react";

export default function CheckoutForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
    } = useForm();

    const orderConfirmMessage = useRef("");

    const orderedItems = loadState(); //Order items from Redux state
    if (orderedItems) {
        orderedItems.total = getTotalCost().toFixed(2);
    }

    const onSubmit = (data) => {
        if (!orderedItems) return;
        data.order = orderedItems; //append order items to form submission data

        axios
            .post(route("send-order"), {
                data: JSON.stringify(data),
            })
            .then((response) => {
                console.log(response);
                
                orderConfirmMessage.current.textContent =
                    "Thank you for your order! You will be redirected soon.";

                setInterval(() => {
                    window.location = route("order-confirmation");
                }, 2000);
            });
    };

    return (
        <div className="flex flex-col justify-center items-center w-full mx-auto">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white w-full border-form-border-color rounded border-2 p-5 lg:p-10 mb-5"
            >
                <h2 className="font-bold text-sm">Customer Information</h2>
                <p className="text-gray-text text-[0.75rem] mb-4">
                    Fields marked as (*) are required.
                </p>
                <div className="customer-name w-full flex flex-col lg:flex-row mb-5">
                    <div className="flex flex-col w-full mb-4 lg:mb-0 lg:w-6/12 mr-5">
                        <input
                            {...register("firstName", {
                                required: "First name is required.",
                                maxLength: {
                                    value: 20,
                                    message:
                                        "First name cannot exceed 20 characters.",
                                },
                                pattern: {
                                    value: /^[a-zA-ZČčĘęĖėĮįŠšŲųŪūŽž]+$/,
                                    message:
                                        "First name can only contain letters.",
                                },
                            })}
                            type="text"
                            placeholder="First name*"
                            className="py-4 border-input-border text-md min-h-[58px] w-full placeholder:text-gray-text"
                            aria-invalid={errors.firstName ? "true" : "false"}
                        />
                        {errors.firstName && (
                            <p
                                role="alert"
                                className="text-red-600 font-bold text-sm"
                            >
                                {errors.firstName.message}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col w-full lg:w-6/12">
                        <input
                            {...register("lastName", {
                                required: "Last name is required.",
                                maxLength: {
                                    value: 20,
                                    message:
                                        "Last name cannot exceed 20 characters.",
                                },
                                pattern: {
                                    value: /^[a-zA-ZČčĘęĖėĮįŠšŲųŪūŽž]+$/,
                                    message:
                                        "Last name can only contain letters.",
                                },
                            })}
                            type="text"
                            placeholder="Last name*"
                            className="py-4 border-input-border w-full text-md placeholder:text-gray-text"
                            aria-invalid={errors.lastName ? "true" : "false"}
                        />
                        {errors.lastName && (
                            <p
                                role="alert"
                                className="text-red-600 font-bold text-sm"
                            >
                                {errors.lastName.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="shipping-adress w-full">
                    <h2 className="font-bold text-sm pt-3 mb-4">
                        Shipping Address
                    </h2>
                    <div className="street-adress w-full mb-4">
                        <input
                            {...register("streetAddress", {
                                required: "Street address is required.",
                                maxLength: {
                                    value: 30,
                                    message:
                                        "Street address cannot exceed 30 characters.",
                                },
                                pattern: {
                                    value: /^[a-zA-ZČčĘęĖėĮįŠšŲųŪūŽž0-9\s\-\.\,]+$/,
                                    message:
                                        "Please enter a correct street address.",
                                },
                            })}
                            type="text"
                            placeholder="Address*"
                            className="py-4 border-input-border text-md w-full placeholder:text-gray-text"
                            aria-invalid={
                                errors.streetAddress ? "true" : "false"
                            }
                        />
                        {errors.streetAddress && (
                            <p
                                role="alert"
                                className="text-red-600 font-bold text-sm"
                            >
                                {errors.streetAddress.message}
                            </p>
                        )}
                    </div>
                    <div className="adress-details flex flex-col lg:flex-row justify-between w-full">
                        <div className="country-select relative w-full mb-4 lg:mb-0 lg:w-[35%] mr-4">
                            <label
                                className="absolute text-[0.8rem] top-[0.2rem] left-3 z-10"
                                htmlFor="country-selection"
                            >
                                Country*
                            </label>
                            <select
                                {...register("country", {
                                    required: "Country is required.",
                                })}
                                name="country-selection"
                                className="relative pt-5 pb-3 text-gray-text w-full border-input-border"
                                aria-invalid={errors.country ? "true" : "false"}
                                value={watch("country") || ""}
                                onChange={(e) =>
                                    setValue("country", e.target.value, {
                                        shouldValidate: true,
                                    })
                                }
                            >
                                <option value="" disabled>
                                    Select
                                </option>
                                <option value="Lithuania">Lithuania</option>
                                <option value="Estonia">Estonia</option>
                                <option value="Latvia">Latvia</option>
                                <option value="Finland">Finland</option>
                                <option value="Sweden">Sweden</option>
                                <option value="Norway">Norway</option>
                                <option value="United States">
                                    United States
                                </option>
                                <option value="United Kingdom">
                                    United Kingdom
                                </option>
                            </select>
                            {errors.country && (
                                <p
                                    role="alert"
                                    className="text-red-600 font-bold text-sm"
                                >
                                    {errors.country.message}
                                </p>
                            )}
                        </div>
                        <div className="region-select relative w-full mb-4 lg:mb-0 lg:w-[35%] mr-4">
                            <label
                                className="absolute text-[0.8rem] top-[0.2rem] left-3 z-10"
                                htmlFor="region-selection"
                            >
                                Region/State*
                            </label>
                            <select
                                {...register("region", {
                                    required: "Region is required.",
                                })}
                                name="region-selection"
                                className="relative pt-5 pb-3 w-full text-gray-text border-input-border"
                                aria-invalid={errors.region ? "true" : "false"}
                                value={watch("region") || ""}
                                onChange={(e) =>
                                    setValue("region", e.target.value, {
                                        shouldValidate: true,
                                    })
                                }
                            >
                                <option value="" disabled>
                                    Select
                                </option>
                                <option value="Europe">Europe</option>
                                <option value="North America">
                                    North America
                                </option>
                            </select>
                            {errors.region && (
                                <p
                                    role="alert"
                                    className="text-red-600 font-bold text-sm"
                                >
                                    {errors.region.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col w-full lg:w-[30%]">
                            <input
                                {...register("postalCode", {
                                    required: "Postal code is required.",
                                    maxLength: {
                                        value: 5,
                                        message:
                                            "Postal code can not exceed 5 characters.",
                                    },
                                    pattern: {
                                        value: /^\d+$/,
                                        message:
                                            "Postal code can only contain numbers.",
                                    },
                                })}
                                type="text"
                                placeholder="Postal code*"
                                className="py-4 border-input-border text-md placeholder:text-gray-text"
                                aria-invalid={
                                    errors.postalCode ? "true" : "false"
                                }
                            />
                            {errors.postalCode && (
                                <p
                                    role="alert"
                                    className="text-red-600 font-bold text-sm"
                                >
                                    {errors.postalCode.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="payment-details w-full">
                        <h2 className="font-bold mt-5 mb-4 pt-3 text-sm">
                            Payment Method
                        </h2>
                        <div className="border w-full border-input-border py-5 px-3">
                            <p className="text-[1rem] font-normal">
                                Credit card
                            </p>
                        </div>
                        <div className="bg-light-gray w-full border-input-border border-b border-l border-r p-5 mb-4">
                            <div className="card-number mb-3 w-full flex flex-col">
                                <input
                                    {...register("cardNumber", {
                                        required: false,
                                        maxLength: {
                                            value: 16,
                                            message:
                                                "Card number can not exceed 16 characters.",
                                        },
                                        pattern: {
                                            value: /^\d+$/,
                                            message:
                                                "Card number can only contain numbers.",
                                        },
                                    })}
                                    type="text"
                                    className="w-full py-4 border-input-border placeholder:text-gray-text"
                                    placeholder="Card number"
                                />
                                {errors.cardNumber && (
                                    <p
                                        role="alert"
                                        className="text-red-600 font-bold text-sm"
                                    >
                                        {errors.cardNumber.message}
                                    </p>
                                )}
                            </div>
                            <div className="card-details flex">
                                <div className="w-6/12 lg:w-[30%] flex flex-col mr-5">
                                    <div className="flex justify-between bg-white border border-input-border">
                                        <input
                                            {...register("expirationMonth", {
                                                required: false,
                                                min: {
                                                    value: 1,
                                                    message:
                                                        "Please enter a correct month.",
                                                },
                                                max: {
                                                    value: 12,
                                                    message:
                                                        "Please enter a correct month.",
                                                },
                                                maxLength: {
                                                    value: 2,
                                                    message:
                                                        "Card number can not exceed 2 characters.",
                                                },
                                                pattern: {
                                                    value: /^\d+$/,
                                                    message:
                                                        "Please enter a number.",
                                                },
                                            })}
                                            type="text"
                                            placeholder="MM"
                                            className="py-4 w-6/12 border-0 text-center placeholder:text-gray-text"
                                        />
                                        <div className="text-gray-text text-lg flex items-center">
                                            /
                                        </div>
                                        <input
                                            {...register("expirationYear", {
                                                required: false,
                                                min: {
                                                    value: 24,
                                                    message:
                                                        "Please enter a valid expiration year.",
                                                },
                                                maxLength: {
                                                    value: 2,
                                                    message:
                                                        "Expiration year can not exceed 2 characters.",
                                                },
                                                pattern: {
                                                    value: /^\d+$/,
                                                    message:
                                                        "Expiration year can only contain numbers.",
                                                },
                                            })}
                                            type="text"
                                            placeholder="YY"
                                            className="py-4  border-0 w-6/12 text-center placeholder:text-gray-text"
                                        />
                                    </div>
                                    {errors.expirationMonth && (
                                        <p
                                            role="alert"
                                            className="text-red-600 font-bold text-sm"
                                        >
                                            {errors.expirationMonth.message}
                                        </p>
                                    )}
                                    {errors.expirationYear && (
                                        <p
                                            role="alert"
                                            className="text-red-600 font-bold text-sm"
                                        >
                                            {errors.expirationYear.message}
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col w-6/12 lg:w-[20%]">
                                    <input
                                        {...register("cvv", {
                                            required: false,
                                            maxLength: {
                                                value: 3,
                                                message:
                                                    "CVV can not exceed 3 characters.",
                                            },
                                            pattern: {
                                                value: /^\d+$/,
                                                message:
                                                    "CVV can only contain numbers.",
                                            },
                                        })}
                                        type="text"
                                        placeholder="CVV"
                                        className="py-4 border-input-border placeholder:text-gray-text"
                                    />
                                    {errors.cvv && (
                                        <p
                                            role="alert"
                                            className="text-red-600 font-bold text-sm"
                                        >
                                            {errors.cvv.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <input
                    type="submit"
                    value="Complete order"
                    className="bg-success-color text-white text-sm uppercase w-full font-bold mt-5 py-4 px-3 shadow-md cursor-pointer"
                />
                <div className="order-confirmation">
                    <p
                        className="text-success-color mt-5 text-lg text-center"
                        ref={orderConfirmMessage}
                    ></p>
                </div>
                <div className="security-badges mt-3 mb-5 w-full flex justify-center">
                    <img
                        className="w-[70%]"
                        src="/assets/security-badges.png"
                        alt="Verified security badges"
                    />
                </div>
            </form>
            <Link
                href={route("shop")}
                className="text-2xl hover:text-footer-color font-bold underline decoration-2 mt-3 decoration-footer-color"
            >
                Go to shop
            </Link>
        </div>
    );
}
