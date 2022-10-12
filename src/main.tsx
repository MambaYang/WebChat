import ReactDOM from "react-dom/client"
import Bmob from "hydrogen-js-sdk"
import { RouterProvider } from "react-router-dom"
import router from "./router"
import "antd/dist/antd.less"

Bmob.initialize("32d0f36ca7d67728", "051614")
Bmob.debug(true) // 开启调试模式

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <RouterProvider router={router} />
)
