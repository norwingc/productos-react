import {
    Form,
    Link,
    useActionData,
    ActionFunctionArgs,
    redirect,
} from "react-router";
import ErrorMessage from "../components/ErrorMessage";
import { storeProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";

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
                <ProductForm />
                <input
                    type="submit"
                    className="mt-5 w-full bg-primary p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Registrar Producto"
                />
            </Form>
        </>
    );
}
