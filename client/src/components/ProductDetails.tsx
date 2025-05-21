import { Product } from "../types";
import { formatPrice } from "../utils";
import { Link, useNavigate } from "react-router";

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
            <td className="p-3 text-lg text-gray-800">
                <div className="flex justify-center items-center gap-2">
                    <Link
                        to={`/products/${product.id}/edit`}
                        className="rounded-md bg-teal-800 p-3 text-sm font-bold text-white shadow-sm hover:bg-teal-800/80"
                    >
                        Editar
                    </Link>
                </div>
            </td>
        </tr>
    );
}
