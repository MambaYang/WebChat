import { PlusOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons"
import { Input, Avatar, List, Button, message, Modal } from "antd"
import { useEffect, useState } from "react"
import { IMaddFriend, IMdeleteFriend, _TIMTYPE } from "../../../../../api/TIM"
import "../../chat/chatAside/index.less"
import "./index.less"
interface IModalCorrdinate {
    clientX: number | null
    clientY: number | null
}
function InfoAside({
    friendList,
    allAvatarList,
    setActiveInfo,
    ActiveInfoIndex,
    SetActiveInfoIndex,
    activeInfo,
    getFriendList,
}) {
    const [addFirendState, setAddFirendState] = useState("")
    const [ModalCoordinate, SetModalCoordinate] = useState<IModalCorrdinate>({
        clientX: null,
        clientY: null,
    })
    const _getFriendList = () => {
        getFriendList()
    }
    const addFriend = async () => {
        const options = {
            to: addFirendState,
            source: "AddSource_Type_Web",
        }
        const res = await IMaddFriend(options)
        const { code } = res.data
        if (code === 30539) {
            // 30539 说明 user1 设置了【需要经过自己确认对方才能添加自己为好友】，此时 SDK 会触发 TIM.EVENT.FRIEND_APPLICATION_LIST_UPDATED 事件
        } else if (code === 0) {
            // 0 说明 user1 设置了【允许任何人添加自己为好友】，此时 SDK 会触发 TIM.EVENT.FRIEND_LIST_UPDATED 事件
            setAddFirendState("")
            // console.log(res.data)
            setTimeout(() => {
                _getFriendList()
                message.success("添加成功")
            }, 500)
        }
    }
    const [isModalOpen, setIsModalOpen] = useState(false)

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOk = () => {
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    return (
        <>
            <header className="aside-header">
                <div className="aside-header-box">
                    <Input
                        placeholder="添加新好友"
                        prefix={<SearchOutlined />}
                        size="middle"
                        // style={{ width: "200px" }}
                        value={addFirendState}
                        onChange={(e) => {
                            setAddFirendState(e.target.value)
                        }}
                    />
                </div>

                <div>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        size="small"
                        onClick={addFriend}
                    />
                </div>
            </header>
            <main className="aside-main">
                <ul>
                    {friendList.length ? (
                        friendList.map((item, index) => {
                            return (
                                <li
                                    key={item.userID}
                                    onClick={(e) => {
                                        SetActiveInfoIndex(index)
                                        setActiveInfo(item)
                                    }}
                                    onMouseDown={(e) => {
                                        // 右键
                                        if (e.button === 2) {
                                            SetModalCoordinate({
                                                clientX: e.clientX,
                                                clientY: e.clientY,
                                            })
                                            showModal()
                                        }
                                    }}
                                    onContextMenu={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                    }}
                                    className={
                                        ActiveInfoIndex === index
                                            ? "active"
                                            : ""
                                    }
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            padding: "10px 20px",
                                            pointerEvents: "none",
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: "40px",
                                                height: "40px",
                                            }}
                                        >
                                            <Avatar
                                                shape="square"
                                                src={allAvatarList[item.avatar]}
                                                icon={<UserOutlined />}
                                                style={{ width: "100%" }}
                                            />
                                        </div>

                                        <span
                                            style={{
                                                fontSize: "16px",
                                                lineHeight: "40px",
                                                marginLeft: "10px",
                                            }}
                                        >
                                            {item.nick}
                                        </span>
                                    </div>
                                </li>
                            )
                        })
                    ) : (
                        <div style={{ textAlign: "center" }}>
                            添加个好友吧😊！
                        </div>
                    )}
                </ul>
            </main>
            <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={false}
                mask={false}
                style={{
                    top: ModalCoordinate.clientY,
                    left: ModalCoordinate.clientX,
                    position: "fixed",
                }}
                width={"fit-content"}
                closable={false}
                className="infoMenuModal"
            >
                <li
                    className="menu-li"
                    onClick={async () => {
                        const res = IMdeleteFriend({
                            userIDList: [activeInfo.userID],
                            type: _TIMTYPE.SNS_DELETE_TYPE_BOTH,
                        })
                        handleOk()
                        setTimeout(() => {
                            _getFriendList()
                            message.success("删除成功")
                        }, 500)
                    }}
                >
                    删除联系人
                </li>
            </Modal>
        </>
    )
}

export default InfoAside
