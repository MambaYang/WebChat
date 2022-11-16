import { createBrowserRouter } from "react-router-dom"
import WelcomeIndex from "../components/welcome/welcome"

import { Login, Register, Home, Welcome, Chat, Info, Rank } from "./Import"
const router = createBrowserRouter([
    {
        path: "home",
        element: <Home />,
        children: [
            {
                path: "chat",
                element: <Chat />,
            },
            {
                path: "info",
                element: <Info />,
            },
            {
                path: "rank",
                element: <Rank />,
            },
        ],
    },
    {
        path: "/",
        element: <Welcome />,
        children: [
            {
                index: true,
                element: <WelcomeIndex />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
        ],
    },
])

export default router
