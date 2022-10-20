import { EllipsisOutlined } from "@ant-design/icons"
import { Avatar, Input, InputRef, Popover } from "antd"

import { useEffect, useRef, useState } from "react"

import MyIcon from "../../../../../assets/MyIcon"
import Emoji from "./emoji"
import "./index.less"
const { TextArea } = Input

function ChatContent() {
    const inputRef = useRef<InputRef>(null)
    const [areaValue, setareaValue] = useState<string>("")
    const [emojiOpen, setOpen] = useState<boolean>(false)

    const onFocus = () => {
        inputRef.current.focus({
            preventScroll: true,
        })
    }
    useEffect(() => {
        onFocus()
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
                        {/* 表情气泡卡 */}
                        <Popover
                            content={
                                <Emoji
                                    areaValue={areaValue}
                                    setValue={setareaValue}
                                    setOpen={setOpen}
                                    inputRef={inputRef}
                                />
                            }
                            trigger="click"
                            open={emojiOpen}
                            onOpenChange={(newOpen: boolean) => {
                                setOpen(newOpen)
                            }}
                        >
                            <MyIcon
                                type="icon-emoji"
                                style={{ fontSize: "32px" }}
                            />
                        </Popover>
                        {/* 聊天记录 */}
                        <MyIcon
                            type="icon-record"
                            style={{ fontSize: "32px" }}
                        />
                    </div>
                    <div className="input-area" id="area">
                        <TextArea
                            bordered={false}
                            ref={inputRef}
                            autoSize={{ minRows: 7 }}
                            value={areaValue}
                            onChange={(e) => {
                                setareaValue(e.target.value)
                            }}
                            onPressEnter={(e) => {
                                // e.preventDefault()
                                console.log("发送:" + areaValue)
                            }}
                        />
                    </div>
                </div>
            </footer>
        </>
    )
}

export default ChatContent
