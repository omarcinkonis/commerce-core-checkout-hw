import { createSlice, nanoid } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "product",
    initialState: [],
    reducers: {
        addProduct: {
            reducer(state, action) {
                return [...state, action.payload];
            },
            prepare(itemId, name, price, image, quantity) {
                return {
                    payload: {
                        id: nanoid(),
                        itemId,
                        name,
                        price,
                        image,
                        quantity,
                    },
                };
            },
        },
        removeProduct: (state, action) =>
            state.filter((item) => item.id !== action.payload),
        resetState: () => {
            return initialState;
        },
    },
});

export const { addProduct, removeProduct, resetState } = productSlice.actions;

export default productSlice.reducer;
