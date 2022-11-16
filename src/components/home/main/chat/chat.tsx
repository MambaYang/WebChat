import { Empty } from "antd"
import { useState } from "react"
import { useHomeContent } from "../../home"
import ChatAside from "./chatAside"
import ChatMain from "./chatMain"

function Chat() {
    const {
        conversationList,
        activeMessageList,
        activeConversation,
        setActiveConversation,
        setActiveMessageList,
        activeConversationIndex,
        setActiveConversationIndex,
        getConversationList,
        allAvatarList,
        getMessageList,
    } = useHomeContent()

    return (
        <>
            <div className="aside-box">
                <ChatAside
                    activeConversationIndex={activeConversationIndex}
                    setActiveConversationIndex={setActiveConversationIndex}
                    setActiveConversation={setActiveConversation}
                    conversationList={conversationList}
                    allAvatarList={allAvatarList}
                    activeConversation={activeConversation}
                />
            </div>
            <div className="main-box">
                {activeConversation ? (
                    <ChatMain
                        setActiveMessageList={setActiveMessageList}
                        activeConversation={activeConversation}
                        activeMessageList={activeMessageList}
                        setActiveConversation={setActiveConversation}
                        getConversationList={getConversationList}
                        allAvatarList={allAvatarList}
                        getMessageList={getMessageList}
                    />
                ) : (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
            </div>
        </>
    )
}

export default Chat
