import { useHomeContent } from "../../home"
import InfoAside from "./infoAside"
import InfoMain from "./infoMain"

function Info() {
    const {
        friendList,
        allAvatarList,
        activeInfo,
        conversationList,
        ActiveInfoIndex,
        setConversationList,
        setActiveConversation,
        setActiveConversationIndex,
        SetActiveNav,
        SetActiveInfoIndex,
        setActiveInfo,
        getFriendList,
    } = useHomeContent()
    return (
        <>
            <div className="aside-box">
                <InfoAside
                    friendList={friendList}
                    allAvatarList={allAvatarList}
                    SetActiveInfoIndex={SetActiveInfoIndex}
                    ActiveInfoIndex={ActiveInfoIndex}
                    setActiveInfo={setActiveInfo}
                    activeInfo={activeInfo}
                    getFriendList={getFriendList}
                />
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
                {activeInfo && (
                    <InfoMain
                        activeInfo={activeInfo}
                        allAvatarList={allAvatarList}
                        conversationList={conversationList}
                        setConversationList={setConversationList}
                        setActiveConversation={setActiveConversation}
                        setActiveConversationIndex={setActiveConversationIndex}
                        SetActiveNav={SetActiveNav}
                    />
                )}
            </div>
        </>
    )
}

export default Info
