import { DraftProductSchema, ProductsSchema } from "../types";
import { safeParse } from "valibot";
import axios from "axios";

type ProductData = {
    [k: string]: FormDataEntryValue;
};

export async function storeProduct(data: ProductData) {
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: Number(data.price),
        });

        if (!result.success) {
            throw new Error("Invalid data");
        }

        await axios.post(
            `${import.meta.env.VITE_API_URL}/api/products`,
            result.output
        );
    } catch (error) {
        console.log("error", error);
    }
}

export async function getProducts() {
    const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/products`
    );

    const result = safeParse(ProductsSchema, data.data);

    if (!result.success) {
        throw new Error("Invalid data");
    }

    return result.output;
}
