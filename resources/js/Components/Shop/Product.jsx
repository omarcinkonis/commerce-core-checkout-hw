import PrimaryButton from "../PrimaryButton";
import { useDispatch } from "react-redux";
import { addProduct } from "@/features/product/productSlice";
import { useState } from "react";

export default function Product({ productId, name, price, image }) {
    const [quantity, setQuantity] = useState(0);
    const dispatch = useDispatch();
    let quantityCount = 0;

    return (
        <>
            <div className="product flex flex-col items-center justify-center rounded-xl border-4 border-form-border-color px-10 py-4 m-3">
                <h1 className="text-2xl font-bold mt-3">{name}</h1>
                <img className="size-[200px]" src={image} alt={name} />
                <h2 className="text-xl font-bold mb-4">${price}</h2>
                <div className="product-quantity">
                    <div className="quantity px-4 py-2 mb-3 border-2 rounded border-form-border-color">
                        <PrimaryButton
                            className="text-xl font-bold px-3 mr-3"
                            onClick={() => {
                                quantityCount = quantity;
                                quantityCount++;
                                setQuantity(quantityCount);
                            }}
                        >
                            +
                        </PrimaryButton>
                        {quantity}
                        <PrimaryButton
                            className="text-xl px-4 ml-3"
                            onClick={() => {
                                quantityCount = quantity;
                                quantityCount--;
                                if (quantityCount < 0) quantityCount = 0;
                                setQuantity(quantityCount);
                            }}
                        >
                            -
                        </PrimaryButton>
                    </div>
                </div>
                <PrimaryButton
                    className="px-5 py-2 mb-3 border-4 font-bold text-md"
                    onClick={() => {
                        if (quantity > 0)
                            dispatch(
                                addProduct(
                                    productId,
                                    name,
                                    price,
                                    image,
                                    quantity
                                )
                            );
                    }}
                >
                    Add to cart
                </PrimaryButton>
            </div>
        </>
    );
}
