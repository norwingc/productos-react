import {
    Form,
    Link,
    useActionData,
    ActionFunctionArgs,
    redirect,
} from "react-router";
import ErrorMessage from "../components/ErrorMessage";
import { storeProduct } from "../services/ProductService";

export async function action({ request }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData());
    let errors = "";
    if (Object.values(data).some((value) => !value)) {
        errors = "Todos los campos son obligatorios";
        return errors;
    }

    if (errors.length) {
        return errors;
    }

    await storeProduct(data);

    return redirect("/");
}

export default function NewProduct() {
    const error = useActionData() as string;
    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">
                    Registrar un nuevo producto
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
                <div className="mb-4">
                    <label className="text-gray-800" htmlFor="name">
                        Nombre Producto:
                    </label>
                    <input
                        id="name"
                        type="text"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Nombre del Producto"
                        name="name"
                    />
                </div>
                <div className="mb-4">
                    <label className="text-gray-800" htmlFor="price">
                        Precio:
                    </label>
                    <input
                        id="price"
                        type="number"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Precio Producto. ej. 200, 300"
                        name="price"
                    />
                </div>
                <input
                    type="submit"
                    className="mt-5 w-full bg-primary p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Registrar Producto"
                />
            </Form>
        </>
    );
}
