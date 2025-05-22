import { Product } from "../types";
import { formatPrice } from "../utils";
import { useNavigate } from "react-router";

export default function ProductDetails({ product }: { product: Product }) {
    const navigate = useNavigate();

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
                    <button
                        onClick={() => navigate(`/products/${product.id}/edit`)}
                        className="rounded-md bg-primary p-3 text-sm font-bold text-white shadow-sm hover:bg-primary/80"
                    >
                        Editar
                    </button>
                </div>
            </td>
        </tr>
    );
}
