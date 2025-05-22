import { ActionFunctionArgs, Link, useLoaderData } from "react-router";
import { getProducts, updateAvailability } from "../services/ProductService";
import ProductDetails from "../components/ProductDetails";

export async function loader() {
    const products = await getProducts();
    return products;
}

export async function action({ request }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData());
    await updateAvailability(Number(data.id));
}

export default function Products() {
    const products = useLoaderData<typeof loader>();

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">
                    Productos
                </h2>
                <Link
                    to="/products/create"
                    className="rounded-md bg-primary p-3 text-sm font-bold text-white shadow-sm hover:bg-primary/80"
                >
                    Agregar producto
                </Link>
            </div>

            <div className="p-2">
                <table className="w-full mt-5 table-auto">
                    <thead className="bg-slate-800 text-white">
                        <tr>
                            <th className="p-2">Producto</th>
                            <th className="p-2">Precio</th>
                            <th className="p-2">Disponibilidad</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <ProductDetails
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
