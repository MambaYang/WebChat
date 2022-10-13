import { Avatar } from "antd"
import "./nav.less"

import MyIcon from "../../../assets/MyIcon"
import { useState } from "react"
import { Link } from "react-router-dom"

function Nav() {
    const [isShowDialog, setShowDialog] = useState<boolean>(false)
    const [nav, setNav] = useState<string>("chat")

    return (
        <div className="nav">
            <div className="avatar">
                <Avatar
                    src="https://joeschmoe.io/api/v1/random"
                    onClick={() => setShowDialog(!isShowDialog)}
                />
                {/* 模态框 */}
                {isShowDialog && (
                    <>
                        <div className="avatar-dialog">
                            <div className="avatar-dialog-header">
                                <div className="dialog-info">
                                    <span>昵称</span>
                                    <span>用户ID: adsd</span>
                                </div>
                                <div className="dialog-avatar">
                                    <Avatar src="https://joeschmoe.io/api/v1/random" />
                                </div>
                            </div>
                            <div className="avatar-dialog-menu">
                                <ul>
                                    <li>
                                        <span>个性标签</span>
                                    </li>
                                    <li>
                                        <span>退出</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div
                            className="dialog-shade"
                            onClick={() => setShowDialog(!isShowDialog)}
                        ></div>
                    </>
                )}
            </div>
            <ul>
                <li>
                    <Link to="./chat" onClick={() => setNav("chat")}>
                        <MyIcon
                            type={
                                nav === "chat"
                                    ? "icon-message-fill"
                                    : "icon-message"
                            }
                            style={{ fontSize: "36px" }}
                        />
                    </Link>
                </li>
                <li>
                    <Link to="./info" onClick={() => setNav("info")}>
                        <MyIcon
                            type={
                                nav === "info"
                                    ? "icon-people-fill"
                                    : "icon-people"
                            }
                            style={{ fontSize: "36px" }}
                        />
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Nav
