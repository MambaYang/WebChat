import { EllipsisOutlined } from "@ant-design/icons"
import { Avatar, Button, Divider, Input, InputRef, Popover } from "antd"
import { useEffect, useRef } from "react"
import MyIcon from "../../../../../assets/MyIcon"
import "./index.less"
const { TextArea } = Input
function ChatContent() {
    const inputRef = useRef<InputRef>(null)
    useEffect(() => {
        inputRef.current.focus({
            cursor: "end",
        })
    })
    return (
        <>
            <header className="main-header">
                <div className="header-item">
                    <span>昵称</span>
                    <span
                        style={{
                            fontSize: "12px",
                            display: "block",
                            color: "rgb(95, 95, 95)",
                        }}
                    >
                        个性签名
                    </span>
                </div>
                <div className="headerBox">
                    <EllipsisOutlined />
                </div>
            </header>
            <main className="main-content">
                <ul className="Chat-message-list">
                    <li>
                        <div className="message-bubble">
                            <Avatar src="https://joeschmoe.io/api/v1/random" />
                            <div className="message-area">
                                <div className="content content-in">
                                    <span className="text-box">收到消息</span>
                                </div>
                            </div>
                            <label className="message-label">
                                <span>未读</span>
                            </label>
                        </div>
                    </li>
                    <li>
                        <div className="message-bubble reverse">
                            <Avatar src="https://joeschmoe.io/api/v1/random" />
                            <div className="message-area">
                                <div className="content content-out">
                                    <span className="text-box">发送消息</span>
                                </div>
                            </div>
                            <label className="message-label">
                                <span>未读</span>
                            </label>
                        </div>
                    </li>
                    <li>
                        <div className="message-bubble reverse">
                            <Avatar src="https://joeschmoe.io/api/v1/random" />
                            <div className="message-area">
                                <div className="content content-out">
                                    <span className="text-box">发送消息</span>
                                </div>
                            </div>
                            <label className="message-label">
                                <span>未读</span>
                            </label>
                        </div>
                    </li>
                    <li>
                        <div className="message-bubble reverse">
                            <Avatar src="https://joeschmoe.io/api/v1/random" />
                            <div className="message-area">
                                <div className="content content-out">
                                    <span className="text-box">发送消息</span>
                                </div>
                            </div>
                            <label className="message-label">
                                <span>未读</span>
                            </label>
                        </div>
                    </li>
                    <li>
                        <div className="message-bubble reverse">
                            <Avatar src="https://joeschmoe.io/api/v1/random" />
                            <div className="message-area">
                                <div className="content content-out">
                                    <span className="text-box">发送消息</span>
                                </div>
                            </div>
                            <label className="message-label">
                                <span>未读</span>
                            </label>
                        </div>
                    </li>
                    <li>
                        <div className="message-bubble reverse">
                            <Avatar src="https://joeschmoe.io/api/v1/random" />
                            <div className="message-area">
                                <div className="content content-out">
                                    <span className="text-box">发送消息</span>
                                </div>
                            </div>
                            <label className="message-label">
                                <span>未读</span>
                            </label>
                        </div>
                    </li>
                    <li>
                        <div className="message-bubble reverse">
                            <Avatar src="https://joeschmoe.io/api/v1/random" />
                            <div className="message-area">
                                <div className="content content-out">
                                    <span className="text-box">发送消息</span>
                                </div>
                            </div>
                            <label className="message-label">
                                <span>未读</span>
                            </label>
                        </div>
                    </li>

                    <li>
                        <div className="message-bubble reverse">
                            <Avatar src="https://joeschmoe.io/api/v1/random" />
                            <div className="message-area">
                                <div className="content content-out">
                                    <span className="text-box">发送消息</span>
                                </div>
                            </div>
                            <label className="message-label">
                                <span>未读</span>
                            </label>
                        </div>
                    </li>
                    <li>
                        <div className="message-bubble reverse">
                            <Avatar src="https://joeschmoe.io/api/v1/random" />
                            <div className="message-area">
                                <div className="content content-out">
                                    <span className="text-box">发送消息</span>
                                </div>
                            </div>
                            <label className="message-label">
                                <span>未读</span>
                            </label>
                        </div>
                    </li>
                    <li>
                        <div className="message-bubble reverse">
                            <Avatar src="https://joeschmoe.io/api/v1/random" />
                            <div className="message-area">
                                <div className="content content-out">
                                    <span className="text-box">发送消息</span>
                                </div>
                            </div>
                            <label className="message-label">
                                <span>未读</span>
                            </label>
                        </div>
                    </li>
                    <li>
                        <div className="message-bubble reverse">
                            <Avatar src="https://joeschmoe.io/api/v1/random" />
                            <div className="message-area">
                                <div className="content content-out">
                                    <span className="text-box">发送消息</span>
                                </div>
                            </div>
                            <label className="message-label">
                                <span>未读</span>
                            </label>
                        </div>
                    </li>
                </ul>
            </main>
            <footer className="main-footer">
                <div className="input-box">
                    <div className="input-header">
                        <Popover content={<div>表情</div>} trigger="click">
                            <MyIcon
                                type="icon-emoji"
                                style={{ fontSize: "32px" }}
                            />
                        </Popover>
                        <MyIcon
                            type="icon-record"
                            style={{ fontSize: "32px" }}
                        />
                    </div>
                    <div className="input-area">
                        <TextArea
                            autoSize={{ minRows: 1 }}
                            bordered={false}
                            ref={inputRef}
                        />
                    </div>
                </div>
            </footer>
        </>
    )
}

export default ChatContent
