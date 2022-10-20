import ChatAside from "./chatAside"
import ChatMain from "./chatMain"

function Chat() {
    return (
        <>
            <div className="aside-box">
                <ChatAside />
            </div>
            <div
                className="main-box"
                // onMouseDown={(
                //     e: React.MouseEvent<HTMLDivElement, MouseEvent>
                // ) => {
                //     if (e.target !== areaDom) {
                //         e.preventDefault()
                //     }
                // }}
            >
                <ChatMain />
            </div>
        </>
    )
}

export default Chat
