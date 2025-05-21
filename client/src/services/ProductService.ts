import { DraftProductSchema } from "../types";
import { safeParse } from "valibot";

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
    } catch (error) {
        console.log("error", error);
    }
}
