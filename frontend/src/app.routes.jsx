import {createBrowserRouter} from "react-router"
import Login from "./features/authentication/pages/login"
import Register from "./features/authentication/pages/Register"

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path:"/",
        element: <h1>Home page</h1>
    }
])