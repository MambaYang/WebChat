import { SearchOutlined, UserOutlined } from "@ant-design/icons"
import { Input, Avatar, List, Badge } from "antd"
import { Dispatch, useEffect, useRef, useState } from "react"
import "./index.less"
import {
    useMyDebounce,
    useAppSelector,
    useGetUrlFromLocal,
} from "../../../../../hooks"
import { IMgetFriendList, IMsetMessageRead } from "../../../../../api/TIM"
import { unix } from "dayjs"

interface IfriendList {
    nick: string
    userID: string
}
type Props = {
    activeConversationIndex: number
    setActiveConversationIndex: Dispatch<any>
    setActiveConversation: Dispatch<any>
    conversationList: []
    allAvatarList: any
    activeConversation: any
}
function ChatAside({
    setActiveConversation,
    activeConversationIndex,
    setActiveConversationIndex,
    conversationList,
    allAvatarList,
    activeConversation,
}: Props) {
    const [isShowDialog, setShowDialog] = useState<boolean>(false)
    const [searchInput, setSearchInput] = useState("")
    const inputRef = useRef(null)
    const [searchedFriendList, setSearchedFriendList] = useState<IfriendList[]>(
        [{ nick: "", userID: "" }]
    )

    const searchInputHandleChange = (e) => {
        setSearchInput(e.target.value)
    }
    const search = async () => {
        const target = inputRef.current.input.value

        if (target !== "") {
            const friendList: IfriendList[] = []
            const { data } = await IMgetFriendList()
            for (let item of data) {
                if (item.profile.nick === target) {
                    friendList.push(item.profile)
                }
            }
            setSearchedFriendList(friendList)
        }
    }

    const searchInputHandleFocus = (e) => {
        setShowDialog(true)
    }
    const searchInputHandleBlur = (e) => {
        setSearchInput("")
        setSearchedFriendList([])
        setShowDialog(false)
    }

    const conversitionClickHandle = async (
        conversition: any,
        index: number
    ) => {
        setActiveConversation(conversition)
        // 上报该会话虽有未读消息已读
        if (conversition.unreadCount) {
            const res = await IMsetMessageRead({
                conversationID: conversition.conversationID,
            })
        }
        setActiveConversationIndex(index)
    }
    return (
        <>
            <header className="aside-header">
                <div className="aside-header-box">
                    <Input
                        placeholder="搜索已添加好友"
                        prefix={<SearchOutlined />}
                        size="middle"
                        style={{ width: "200px" }}
                        onFocus={searchInputHandleFocus}
                        onBlur={searchInputHandleBlur}
                        onChange={searchInputHandleChange}
                        value={searchInput}
                        onKeyUp={useMyDebounce(search, 1000)}
                        ref={inputRef}
                    />
                    {isShowDialog && (
                        <>
                            <div className="search-dialog">
                                <ul>
                                    {searchedFriendList.length ? (
                                        searchedFriendList.map(
                                            (item, index) => {
                                                return (
                                                    <li key={item.userID}>
                                                        <Avatar
                                                            shape="square"
                                                            src="https://joeschmoe.io/api/v1/random"
                                                        />
                                                        <span>{item.nick}</span>
                                                    </li>
                                                )
                                            }
                                        )
                                    ) : (
                                        <div
                                            style={{
                                                height: "50px",
                                                textAlign: "center",
                                                padding: "10px",
                                            }}
                                        >
                                            <span>请输入好友昵称</span>
                                        </div>
                                    )}
                                </ul>
                            </div>
                            <div className="dialog-shade"></div>
                        </>
                    )}
                </div>

                {/* <div>
                    <Button
                        type="primary"
                        icon={<SearchOutlined />}
                        href="https://www.google.com"
                        size="small"
                    />
                </div> */}
            </header>
            <main className="aside-main">
                {conversationList && (
                    <List
                        itemLayout="horizontal"
                        split={false}
                        dataSource={conversationList}
                        size="small"
                        renderItem={(item: any, index: number) => (
                            <List.Item
                                onClick={() => {
                                    conversitionClickHandle(item, index)
                                }}
                                className={
                                    activeConversationIndex === index
                                        ? "active"
                                        : ""
                                }
                            >
                                <List.Item.Meta
                                    avatar={
                                        <Badge
                                            count={item.unreadCount}
                                            size="small"
                                            offset={[-5, 2]}
                                        >
                                            <Avatar
                                                src={
                                                    allAvatarList &&
                                                    item.userProfile
                                                        .profileCustomField[0] &&
                                                    allAvatarList[
                                                        item.userProfile
                                                            .profileCustomField[0]
                                                            .value
                                                    ]
                                                }
                                                icon={<UserOutlined />}
                                                style={{ width: "40px" }}
                                            />
                                        </Badge>
                                    }
                                    title={
                                        <>
                                            {/* 昵称 */}
                                            <span>{item.userProfile.nick}</span>

                                            <span>
                                                {item.lastMessage.lastTime
                                                    ? unix(
                                                          item.lastMessage
                                                              .lastTime
                                                      ).format("YYYY/MM/DD")
                                                    : ""}
                                            </span>
                                        </>
                                    }
                                    description={item.lastMessage.payload.text}
                                />
                            </List.Item>
                        )}
                    />
                )}
            </main>
        </>
    )
}

export default ChatAside
