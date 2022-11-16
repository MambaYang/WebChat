import Nav from "./nav"
import "./home.less"
import { Outlet, useNavigate, useOutletContext } from "react-router-dom"
import { Dispatch, useEffect, useRef, useState } from "react"
import tim, {
    IMGetConversationList,
    IMgetFriendList,
    IMgetMessageList,
    IMgetMyProfile,
    IMLogin,
    _TIMEVENT,
} from "../../api/TIM"
import { message } from "antd"
import { useAppSelector, useAppDispatch } from "../../hooks"
import {
    selectUserInfo,
    save_im_userinfo,
    updateAvatarAsync,
} from "../home/homeSlice"
import { api_getTempFileURL, api_insertEmojiUrlArray } from "../../api"
interface IMUserInfo {
    nick: string
    selfSignature: string
    userID: string
    fileID: string
}
function Home() {
    const navigate = useNavigate()
    const userinfo = useAppSelector(selectUserInfo)
    const dispatch = useAppDispatch()
    const [conversationList, setConversationList] = useState([])
    const [activeMessageList, setActiveMessageList] = useState([])
    const [activeConversation, setActiveConversation] = useState(null)
    const [activeConversationIndex, setActiveConversationIndex] = useState(-1)
    const [friendList, setFriendList] = useState([])
    const [allAvatarList, setAllAvatarList] = useState(null)
    const [activeInfo, setActiveInfo] = useState(null)
    const [ActiveNav, SetActiveNav] = useState<string>("chat")
    const [ActiveInfoIndex, SetActiveInfoIndex] = useState<boolean | null>(null)
    // tim.deleteConversation("C2Cyanghheda@gmail.com")
    useEffect(() => {
        if (userinfo.isLogin) {
            navigate("/home/chat")
        } else {
            navigate("/login")
        }
    }, [userinfo.isLogin])
    // 获取所有好友列表
    const getFriendList = async () => {
        const { data } = await IMgetFriendList()
        const profile = []
        for (let item of data) {
            const obj = {
                userID: item.userID,
                avatar: item.profile.profileCustomField[0]?.value,
                nick: item.profile.nick,
                selfSignature: item.profile.selfSignature,
            }
            profile.push(obj)
        }
        setFriendList(profile)
        const fileList = []
        for (let item of profile) {
            fileList.push(item.avatar)
        }

        fileList.length && getAvatarUrl(fileList)
    }
    const getAvatarUrl = async (fileID: string[]) => {
        const res = await api_getTempFileURL(fileID)
        const urlList = {}
        res.fileList.forEach((item, index) => {
            if (item.code === "SUCCESS") {
                urlList[fileID[index]] = item.download_url
            } else {
                urlList[fileID[index]] = null
            }
        })
        setAllAvatarList(urlList)
    }
    // 获取我的资料
    const getMyProfile = async () => {
        const { data } = await IMgetMyProfile()
        const IMUserInfo: IMUserInfo = {
            nick: data.nick,
            selfSignature: data.selfSignature,
            userID: data.userID,
            fileID: data.profileCustomField[0]?.value,
        }
        IMUserInfo.fileID && dispatch(updateAvatarAsync(IMUserInfo.fileID))

        dispatch(save_im_userinfo(IMUserInfo))
        localStorage.setItem("IMUserInfo", JSON.stringify(IMUserInfo))
    }
    // 获取消息列表
    const getConversationList = async () => {
        const { data } = await IMGetConversationList()
        const conversationList = []
        for (let item of data.conversationList) {
            const { data } = await tim.getConversationProfile(
                item.conversationID
            )
            conversationList.push(data.conversation)
        }

        setConversationList(conversationList)
    }
    const onSdkReady = function (event) {
        getFriendList()
        getMyProfile()
        getConversationList()
    }
    // 刷新等重新加载模块后自动登录 IM
    const online = async () => {
        const IMRes = await IMLogin({
            userID: userinfo.userinfo.email,
            userSig: userinfo.userinfo.userSig,
        })
        if (IMRes.data.repeatLogin) {
            message.error(IMRes.data.errorInfo)
        }

        tim.on(_TIMEVENT.SDK_READY, onSdkReady)
        message.loading("获取中！", 0.5)
    }
    const getMessageList = async () => {
        if (activeConversation.conversationID) {
            const { data } = await IMgetMessageList(
                activeConversation.conversationID
            )
            setActiveMessageList(data.messageList)
        } else {
            setActiveMessageList([])
        }
    }

    // 接受消息
    const onMessageReceived = (event) => {
        activeConversation && getMessageList()
        getConversationList()
    }

    useEffect(() => {
        // 登录TIM
        if (userinfo.isLogin) {
            online()
        }
    }, [])
    useEffect(() => {
        tim.on(_TIMEVENT.MESSAGE_RECEIVED, onMessageReceived)
    }, [activeConversation])

    return (
        <div className="home-box">
            <div className="home-nav">
                <Nav ActiveNav={ActiveNav} SetActiveNav={SetActiveNav} />
            </div>
            <div className="home-main">
                <Outlet
                    context={{
                        conversationList,
                        activeMessageList,
                        activeConversation,
                        activeConversationIndex,
                        friendList,
                        allAvatarList,
                        activeInfo,
                        ActiveInfoIndex,
                        setActiveInfo,
                        setActiveConversation,
                        setActiveMessageList,
                        setActiveConversationIndex,
                        getConversationList,
                        setConversationList,
                        SetActiveNav,
                        SetActiveInfoIndex,
                        getFriendList,
                        getMessageList,
                    }}
                />
            </div>
        </div>
    )
}
type useHomeContent = {
    conversationList: []
    activeMessageList: []
    activeConversation: any
    activeConversationIndex: number
    friendList: []
    allAvatarList: []
    activeInfo: any
    ActiveInfoIndex: number
    setActiveInfo: () => Dispatch<any>
    setActiveConversation: () => Dispatch<any>
    setActiveMessageList: () => Dispatch<any>
    setActiveConversationIndex: Dispatch<any>
    getConversationList: () => void
    setConversationList: Dispatch<any>
    SetActiveNav: Dispatch<any>
    SetActiveInfoIndex: Dispatch<any>
    getFriendList: Function
    getMessageList: () => void
}
export const useHomeContent = () => {
    return useOutletContext<useHomeContent>()
}
export default Home
