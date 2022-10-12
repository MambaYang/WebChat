import { createBrowserRouter } from "react-router-dom"

import { App, Login, Register, Home, Welcome, Chat, Info } from "./Import"
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
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
                ],
            },
        ],
    },
    {
        path: "welcome",
        element: <Welcome />,
        children: [
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
