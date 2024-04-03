import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../features/product/productSlice";
import { saveState } from "../Components/Shop/localStorage";

export const store = configureStore({
    reducer: {
        product: ProductReducer,
    },
});

store.subscribe(() => {
    saveState(store.getState().product);
    console.log(store.getState().product);
});
