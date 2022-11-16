import { EllipsisOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Input, InputRef, message, Popover } from "antd"
import { Dispatch, useEffect, useRef, useState } from "react"
import tim, {
    IMgetMessageList,
    IMsendMessage,
    IMsetMessageRead,
    _TIMTYPE,
    _TIMEVENT,
} from "../../../../../api/TIM"
import MyIcon from "../../../../../assets/MyIcon"
import Emoji from "./emoji"
import "./index.less"
import {
    useAppSelector,
    useAppDispatch,
    useGetUrlFromLocal,
} from "../../../../../hooks"
import { selectUserInfo } from "../../../homeSlice"
import { unix } from "dayjs"
import Record from "./record"
import MyEditor from "./editor"
const { TextArea } = Input
type Props = {
    activeConversation: any
    activeMessageList: any
    allAvatarList: any
    setActiveMessageList: Dispatch<any>
    setActiveConversation: Dispatch<any>
    getConversationList: () => void
    getMessageList: () => void
}
function ChatMain({
    activeConversation,
    activeMessageList,
    allAvatarList,
    setActiveMessageList,
    setActiveConversation,
    getConversationList,
    getMessageList,
}: Props) {
    const { userProfile } = activeConversation
    const inputRef = useRef<InputRef>(null)
    const [areaValue, setareaValue] = useState<string>("")
    const [emojiOpen, setOpen] = useState<boolean>(false)
    const UlRef = useRef(null)
    const { userinfo } = useAppSelector(selectUserInfo)
    const [activeHistoryMessageList, setActiveHistoryMessageList] = useState([])
    const onFocus = () => {
        inputRef.current.focus({
            preventScroll: true,
        })
    }

    // 获取历史消息列表
    // const getMessageList = async () => {
    //     if (activeConversation.conversationID) {
    //         const { data } = await IMgetMessageList(
    //             activeConversation.conversationID
    //         )
    //         setActiveHistoryMessageList(data.messageList)
    //     } else {
    //         setActiveHistoryMessageList([])
    //     }
    // }
    // 输入框回车发送
    const onPressEnterHandle = async (e) => {
        e.preventDefault()
        setareaValue("")
        const { code, data } = await IMsendMessage(
            areaValue,
            userProfile.userID
        )
        if (!code) {
            const newList = activeMessageList.slice()
            newList.push(data.message)
            setActiveMessageList(newList)
            // 重新获取会话列表
            // getConversationList()
        } else {
            message.error("发送消息失败")
        }
    }
    const textAreaOnFocusHandle = async () => {
        // 上报该会话虽有未读消息已读
        if (activeConversation.unreadCount) {
            const res = await IMsetMessageRead({
                conversationID: activeConversation.conversationID,
            })
            getConversationList()
        }
    }
    // 轮询获取信息列表并渲染，为了设置已读回执，替代回执监听的方案
    const pollMessage = () => {
        const timer = setInterval(() => {
            // console.log("轮询")
            setActiveMessageList([])
            getMessageList()
        }, 10000)
    }
    useEffect(() => {
        onFocus()
        getMessageList()
        // 轮询获取消息列表设置已读
        // pollMessage()
    }, [activeConversation])
    useEffect(() => {
        UlRef.current.scrollTo(0, UlRef.current.scrollHeight)
    }, [activeMessageList, activeHistoryMessageList])

    const friendUrl = userProfile.profileCustomField[0]?.value || ""

    return (
        <>
            <header className="main-header">
                <div className="header-item">
                    <span>{userProfile.nick}</span>
                    <span
                        style={{
                            fontSize: "12px",
                            display: "block",
                            color: "rgb(95, 95, 95)",
                        }}
                    >
                        {userProfile.selfSignature
                            ? userProfile.selfSignature
                            : "未设置"}
                    </span>
                </div>
                <div className="headerBox">
                    <EllipsisOutlined />
                </div>
            </header>
            <main className="main-content">
                <ul className="Chat-message-list" ref={UlRef}>
                    {/* 历史消息 */}
                    {activeHistoryMessageList.map((item) => {
                        return (
                            <li key={item.ID}>
                                <div className={`message-bubble ${item.flow}`}>
                                    <Avatar
                                        src={
                                            item.flow === "out"
                                                ? userinfo.avatar
                                                : allAvatarList[friendUrl]
                                        }
                                        icon={<UserOutlined />}
                                    />
                                    <div className="message-area">
                                        <div
                                            className={`content content-${item.flow}`}
                                        >
                                            <span className="text-box">
                                                {item.payload.text}
                                            </span>
                                        </div>
                                    </div>
                                    <label className="message-label">
                                        {item.flow == "out" && (
                                            <span>
                                                {item.isPeerRead
                                                    ? "已读"
                                                    : "未读"}
                                            </span>
                                        )}
                                    </label>
                                </div>
                            </li>
                        )
                    })}
                    {/* {activeMessageList.length ? (
                        <span className="message-time">
                            {unix(activeMessageList[0].time).format("HH:mm")}
                        </span>
                    ) : (
                        <></>
                    )} */}

                    {/* 最新消息 */}
                    {activeMessageList.map((item) => {
                        return (
                            <li key={item.ID}>
                                <div className={`message-bubble ${item.flow}`}>
                                    <Avatar
                                        src={
                                            item.flow === "out"
                                                ? userinfo.avatar
                                                : allAvatarList[friendUrl]
                                        }
                                        icon={<UserOutlined />}
                                    />
                                    <div className="message-area">
                                        <div
                                            className={`content content-${item.flow}`}
                                        >
                                            <span className="text-box">
                                                {item.payload.text}
                                            </span>
                                        </div>
                                    </div>
                                    <label className="message-label">
                                        {item.flow == "out" && (
                                            <span>
                                                {item.isPeerRead
                                                    ? "已读"
                                                    : "未读"}
                                            </span>
                                        )}
                                    </label>
                                </div>
                            </li>
                        )
                    })}
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
                                onFocus()
                                setOpen(newOpen)
                            }}
                        >
                            <MyIcon
                                type="icon-emoji"
                                style={{ fontSize: "32px" }}
                            />
                        </Popover>
                        <MyEditor />

                        {/* 聊天记录 */}
                        <Record activeConversation={activeConversation} />
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
                            onPressEnter={onPressEnterHandle}
                            onFocus={textAreaOnFocusHandle}
                        />
                    </div>
                </div>
            </footer>
        </>
    )
}

export default ChatMain
