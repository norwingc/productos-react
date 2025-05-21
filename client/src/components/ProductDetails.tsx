import { Product } from "../types";
import { formatPrice } from "../utils";

export default function ProductDetails({ product }: { product: Product }) {
    return (
        <tr className="border-b text-center">
            <td className="p-3 text-lg text-gray-800">{product.name}</td>
            <td className="p-3 text-lg text-gray-800">
                {formatPrice(product.price)}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {product.available ? "Disponible" : "No disponible"}
            </td>
            <td className="p-3 text-lg text-gray-800"></td>
        </tr>
    );
}
