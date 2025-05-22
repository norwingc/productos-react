import {
    Form,
    Link,
    useActionData,
    ActionFunctionArgs,
    redirect,
    LoaderFunctionArgs,
    useLoaderData,
} from "react-router";
import ErrorMessage from "../components/ErrorMessage";
import { getProductById, updateProduct } from "../services/ProductService";
import { Product } from "../types";
import ProductForm from "../components/ProductForm";

export async function loader({ params }: LoaderFunctionArgs) {
    const product = await getProductById(Number(params.id));
    if (!product) {
        return redirect("/");
    }
    return product;
}

export async function action({ request, params }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData());
    let errors = "";
    if (Object.values(data).some((value) => !value)) {
        errors = "Todos los campos son obligatorios";
        return errors;
    }

    if (errors.length) {
        return errors;
    }

    await updateProduct(data, Number(params.id));

    return redirect("/");
}

const availableOptions = [
    { name: "Disponible", value: true },
    { name: "No Disponible", value: false },
];

export default function EditProduct() {
    const error = useActionData() as string;
    const product = useLoaderData() as Product;
    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">
                    Editar un producto
                </h2>
                <Link
                    to="/"
                    className="rounded-md bg-primary p-3 text-sm font-bold text-white shadow-sm hover:bg-primary/80"
                >
                    Voler a la lista de productos
                </Link>
            </div>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Form className="mt-10" method="POST">
                
                <ProductForm product={product} />

                <div className="mb-4">
                    <label className="text-gray-800" htmlFor="available">
                        Disponibilidad:
                    </label>
                    <select
                        id="available"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        name="available"
                        defaultValue={product?.available.toString()}
                    >
                        {availableOptions.map((option) => (
                            <option
                                key={option.name}
                                value={option.value.toString()}
                            >
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>
                <input
                    type="submit"
                    className="mt-5 w-full bg-primary p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Editar Producto"
                />
            </Form>
        </>
    );
}
