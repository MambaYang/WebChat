import { UserOutlined } from "@ant-design/icons"
import { Avatar, Button } from "antd"
import { useNavigate } from "react-router-dom"
import "./index.less"
function InfoMain({
    activeInfo,
    allAvatarList,
    conversationList,
    setConversationList,
    setActiveConversation,
    setActiveConversationIndex,
    SetActiveNav,
}) {
    const navigate = useNavigate()
    const isAlreadyAdd = (list: any, targetId: string) => {
        let i: number
        for (i = 0; i < list.length; i++) {
            if (list[i].userProfile.userID === targetId)
                return { isAdd: true, index: i }
        }
        return { isAdd: false, index: i }
    }
    const NewSendMessageHandle = () => {
        const NewConversition = {
            conversationID: null,
            userProfile: {
                nick: activeInfo.nick,
                userID: activeInfo.userID,
                profileCustomField: [
                    {
                        key: "Tag_Profile_Custom_fileId",
                        value: activeInfo.avatar,
                    },
                ],
                selfSignature: activeInfo.selfSignature,
            },
            lastMessage: {
                lastTime: 0,
                payload: "",
            },
        }
        const { isAdd, index } = isAlreadyAdd(
            conversationList,
            activeInfo.userID
        )
        if (!isAdd) {
            setConversationList([NewConversition, ...conversationList])
            setActiveConversation(NewConversition)
        }
        setActiveConversationIndex(isAdd ? index : 0)
        SetActiveNav("chat")
        navigate("/home/chat")
    }
    return (
        <div style={{ width: "80%", margin: "auto" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingBottom: "30px",
                    borderBottom: "1px solid rgb(212, 212, 212)",
                }}
            >
                <div>
                    <p style={{ fontSize: "20px" }}>{activeInfo.nick}</p>
                    <p
                        style={{
                            fontSize: "15px",
                            color: "rgb(180, 180, 180)",
                        }}
                    >
                        {activeInfo.selfSignature
                            ? activeInfo.selfSignature
                            : "???????????????"}
                    </p>
                </div>
                <div
                    style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "8px",
                        overflow: "hidden",
                    }}
                >
                    <Avatar
                        shape="square"
                        src={allAvatarList[activeInfo.avatar]}
                        icon={<UserOutlined />}
                        style={{ width: "100%" }}
                    />
                </div>
            </div>
            <div
                style={{ padding: "50px 0", display: "flex" }}
                className="info-ul"
            >
                <ul>
                    <li>Chat ID</li>
                    <li>?????????</li>
                    <li>??????</li>
                </ul>
                <ul style={{ marginLeft: "50px" }}>
                    <li>{activeInfo.userID}</li>
                    <li>?????????</li>
                    <li>??????</li>
                </ul>
            </div>
            <div style={{ padding: "50px 0", display: "flex" }}>
                <Button
                    type="primary"
                    size="large"
                    style={{ margin: "auto", width: "200px" }}
                    onClick={NewSendMessageHandle}
                >
                    ?????????
                </Button>
            </div>
        </div>
    )
}
export default InfoMain
