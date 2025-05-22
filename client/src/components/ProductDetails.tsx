import { deleteProduct } from "../services/ProductService";
import { Product } from "../types";
import { formatPrice } from "../utils";
import {
    ActionFunctionArgs,
    Form,
    useNavigate,
    redirect,
    useFetcher,
} from "react-router";

export async function action({ params }: ActionFunctionArgs) {
    await deleteProduct(Number(params.id));
    return redirect("/");
}

export default function ProductDetails({ product }: { product: Product }) {
    const fetcher = useFetcher();

    const navigate = useNavigate();

    const isAvailable = product.available;

    return (
        <tr className="border-b text-center">
            <td className="p-3 text-lg text-gray-800">{product.name}</td>
            <td className="p-3 text-lg text-gray-800">
                {formatPrice(product.price)}
            </td>
            <td className="p-3 text-lg text-gray-800">
                <fetcher.Form method="POST">
                    <button
                        type="submit"
                        name="id"
                        value={product.id}
                        className={`rounded-md bg-primary p-3 text-sm font-bold text-white shadow-sm hover:bg-primary/80 ${
                            isAvailable ? "bg-green-500" : "bg-red-500"
                        }`}
                    >
                        {isAvailable ? "Disponible" : "No disponible"}
                    </button>
                </fetcher.Form>
            </td>
            <td className="p-3 text-lg text-gray-800">
                <div className="flex justify-center items-center gap-2">
                    <button
                        onClick={() => navigate(`/products/${product.id}/edit`)}
                        className="rounded-md bg-primary p-3 text-sm font-bold text-white shadow-sm hover:bg-primary/80"
                    >
                        Editar
                    </button>
                    <Form
                        method="POST"
                        action={`/products/${product.id}/delete`}
                        onSubmit={(e) => {
                            if (
                                !confirm(
                                    "¿Estás seguro de querer eliminar este producto?"
                                )
                            ) {
                                e.preventDefault();
                            }
                        }}
                    >
                        <input
                            type="submit"
                            value="Eliminar"
                            className="rounded-md bg-red-500 p-3 text-sm font-bold text-white shadow-sm hover:bg-red-500/80"
                        />
                    </Form>
                </div>
            </td>
        </tr>
    );
}
