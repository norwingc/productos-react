import { createBrowserRouter } from "react-router";
import Layout from "./layouts/Layout";
import Products, { loader as productsLoader } from "./pages/Products";
import NewProduct, { action as newProductAction } from "./pages/NewProduct";
import EditProduct, {
    loader as editProductLoader,
    action as editProductAction,
} from "./pages/EditProduct";
import { action as deleteProductAction } from "./components/ProductDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Products />,
                loader: productsLoader,
            },
            {
                path: "products/create",
                element: <NewProduct />,
                action: newProductAction,
            },
            {
                path: "products/:id/edit",
                element: <EditProduct />,
                loader: editProductLoader,
                action: editProductAction,
            },
            {
                path: "products/:id/delete",
                action: deleteProductAction,
            },
        ],
    },
]);
