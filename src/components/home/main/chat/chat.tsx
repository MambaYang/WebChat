import ChatAside from "./chatAside"
import ChatMain from "./chatMain"

function Chat() {
    return (
        <>
            <div className="aside-box">
                <ChatAside />
            </div>
            <div className="main-box">
                <ChatMain />
            </div>
        </>
    )
}

export default Chat
