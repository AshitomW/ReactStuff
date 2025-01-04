import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/Home";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder, {
    action as actionCreateOrder,
} from "./features/order/CreateOrder";
import Order from "./features/order/Order";
import Error from "./ui/Error";
import AppLayout from "./ui/AppLayout";
import { loader as orderLoader } from "./features/order/SearchOrder";
const router = createBrowserRouter([
    {
        element: <AppLayout />,
        errorElement: <Error />,

        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/menu",
                element: <Menu />,
                loader: menuLoader,
                errorElement: <Error />,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
            {
                path: "/order/new",
                element: <CreateOrder />,
                action: actionCreateOrder,
            },
            {
                path: "/order/:orderID",
                element: <Order />,
                loader: orderLoader,
                errorElement: <Error />,
            },
        ],
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
