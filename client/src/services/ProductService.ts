import {
    DraftProductSchema,
    Product,
    ProductSchema,
    ProductsSchema,
} from "../types";
import { safeParse, number, parse, string, transform, pipe } from "valibot";
import axios from "axios";
import { toBoolean } from "../utils";

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

export async function getProductById(id: Product["id"]) {
    const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/products/${id}`
    );

    const result = safeParse(ProductSchema, data.data);

    if (!result.success) {
        throw new Error("Invalid data");
    }

    return result.output;
}

export async function updateProduct(data: ProductData, id: Product["id"]) {
    try {
        const NumberSchema = pipe(string(), transform(Number), number());

        const result = safeParse(ProductSchema, {
            id: id,
            name: data.name,
            price: parse(NumberSchema, data.price),
            available: toBoolean(data.available.toString()),
        });

        if (!result.success) {
            throw new Error("Invalid data");
        }

        await axios.put(
            `${import.meta.env.VITE_API_URL}/api/products/${id}`,
            result.output
        );
    } catch (error) {
        console.log("error", error);
    }
}

export async function deleteProduct(id: Product["id"]) {
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
}

export async function updateAvailability(id: Product["id"]) {
    await axios.patch(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
}
