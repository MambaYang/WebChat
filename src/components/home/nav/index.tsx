import { Avatar, Input, message, Modal } from "antd"
import { CameraOutlined, EditOutlined, UserOutlined } from "@ant-design/icons"
import "./nav.less"
import MyIcon from "../../../assets/MyIcon"
import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { IMLogout, IMUpdateMyProfile } from "../../../api/TIM"
import { auth } from "../../../api"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { logout, selectUserInfo, updateUserInfo } from "../homeSlice"
import { api_uploadAvatar } from "../../../api"

function Nav({ ActiveNav, SetActiveNav }) {
    const [isShowDialog, setShowDialog] = useState<boolean>(false)

    const avatarInput = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { userinfo } = useAppSelector(selectUserInfo)
    const [open, setOpen] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [updateType, setType] = useState("")
    const [nickVal, setNickVal] = useState("")
    const [selfVal, setSelfVal] = useState("")
    const showModal = (type: string) => {
        setType(type)
        setOpen(true)
    }

    const handleOk = async () => {
        const inputState = updateType == "nick" ? nickVal : selfVal
        const inputSet = updateType == "nick" ? setNickVal : setSelfVal
        setConfirmLoading(true)
        const res: any = await IMUpdateMyProfile({
            [updateType]: inputState,
        })
        if (res.data) {
            dispatch(
                updateUserInfo({
                    [updateType]: inputState,
                })
            )
            // getMyInfo()
        }
        inputSet("")
        setOpen(false)
        setConfirmLoading(false)
    }

    const handleCancel = () => {
        setOpen(false)
    }
    // 登出
    const logoutHandle = async () => {
        const ImRes = await IMLogout()
        auth.signOut()
        localStorage.removeItem("userSig")
        localStorage.removeItem("IMUserInfo")
        localStorage.removeItem("conversationList")
        dispatch(logout())
        message.success("退出成功！")
        navigate("/")
    }
    // 上传头像
    const avatarHandleChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const res = await api_uploadAvatar(e.target.files[0])
        if (res.code) {
            message.error(res.message)
        } else {
            localStorage.setItem("fileID", res.fileID)
            const url = res.fileID.slice(res.fileID.indexOf("avatar"))
            IMUpdateMyProfile({
                profileCustomField: [
                    {
                        key: "Tag_Profile_Custom_fileId",
                        value: url,
                    },
                ],
            })
            // 设置url
            dispatch(updateUserInfo({ avatar: res.download_url }))
        }
    }

    return (
        <div className="nav">
            <div className="avatar">
                <Avatar
                    src={userinfo.avatar}
                    icon={<UserOutlined />}
                    onClick={() => setShowDialog(!isShowDialog)}
                />
                {/* 模态框 */}
                {isShowDialog && (
                    <>
                        <div className="avatar-dialog">
                            <div className="avatar-dialog-header">
                                <div className="dialog-info">
                                    <span
                                        onClick={() => {
                                            showModal("nick")
                                        }}
                                    >
                                        {userinfo.nick || "设置昵称"}
                                        <EditOutlined className="editIcon" />
                                    </span>
                                    <span
                                        onClick={() => {
                                            showModal("selfSignature")
                                        }}
                                    >
                                        {userinfo.selfSignature || "设置签名"}
                                        <EditOutlined className="editIcon" />
                                    </span>
                                </div>
                                <div
                                    className="dialog-avatar"
                                    onClick={() => {
                                        avatarInput.current.click()
                                    }}
                                >
                                    {/* 上传头像 */}
                                    <Avatar
                                        src={userinfo.avatar}
                                        icon={<UserOutlined />}
                                    />
                                    <input
                                        type="file"
                                        multiple={true}
                                        style={{ display: "none" }}
                                        ref={avatarInput}
                                        onChange={avatarHandleChange}
                                    ></input>
                                    <div className="avatar-blur">
                                        <CameraOutlined
                                            style={{
                                                color: "white",
                                                marginTop: "18px",
                                                fontSize: "15px",
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="avatar-dialog-menu">
                                <ul>
                                    <li onClick={logoutHandle}>
                                        <span>退出</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div
                            className="dialog-shade"
                            onClick={() => setShowDialog(!isShowDialog)}
                        ></div>
                    </>
                )}
            </div>
            <ul>
                <li>
                    <Link to="./chat" onClick={() => SetActiveNav("chat")}>
                        <MyIcon
                            type={
                                ActiveNav === "chat"
                                    ? "icon-message-fill"
                                    : "icon-message"
                            }
                            style={{ fontSize: "36px" }}
                        />
                    </Link>
                </li>
                <li>
                    <Link to="./info" onClick={() => SetActiveNav("info")}>
                        <MyIcon
                            type={
                                ActiveNav === "info"
                                    ? "icon-people-fill"
                                    : "icon-people"
                            }
                            style={{ fontSize: "36px" }}
                        />
                    </Link>
                </li>
                <li>
                    <Link to="./rank" onClick={() => SetActiveNav("rank")}>
                        <MyIcon
                            type={
                                ActiveNav === "rank"
                                    ? "icon-like_fill"
                                    : "icon-like"
                            }
                            style={{ fontSize: "36px" }}
                        />
                    </Link>
                </li>
            </ul>
            <Modal
                title={updateType == "nick" ? "修改昵称" : "修改签名"}
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                width="300px"
                mask={false}
            >
                {updateType === "nick" ? (
                    <Input
                        placeholder={userinfo.nick}
                        value={nickVal}
                        onChange={(e) => {
                            setNickVal(e.target.value)
                        }}
                    />
                ) : (
                    <Input
                        placeholder={userinfo.selfSignature}
                        value={selfVal}
                        onChange={(e) => {
                            setSelfVal(e.target.value)
                        }}
                    />
                )}
            </Modal>
        </div>
    )
}

export default Nav
