import { Avatar } from "antd"
import "./nav.less"

import MyIcon from "../../../assets/MyIcon"

function Nav() {
    return (
        <div className="nav">
            <div className="avatar">
                <Avatar src="https://joeschmoe.io/api/v1/random" />
            </div>
            <ul>
                <li>
                    <MyIcon type="icon-message" style={{ fontSize: "36px" }} />
                </li>
                <li>
                    <MyIcon type="icon-people" style={{ fontSize: "36px" }} />
                </li>
            </ul>
        </div>
    )
}

export default Nav
