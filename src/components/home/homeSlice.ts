import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { api_getTempFileURL } from "../../api"

import { RootState } from "../../store"

interface IUserInfo {
    email?: string
    userSig?: string
    nick?: string
    selfSignature?: string
    userID?: string
    avatar?: string
    fileID?: string
}
interface IadminState {
    isLogin: boolean
    userinfo: IUserInfo
}
const userSig = localStorage.getItem("userSig")
const cloudInfo = JSON.parse(
    localStorage.getItem("user_info_mamba-3giisytd4efcf526") ?? "{}"
)
const { nick, selfSignature, userID, fileID } = JSON.parse(
    localStorage.getItem("IMUserInfo") ?? "{}"
)

const initialState: IadminState = {
    isLogin: userSig ? true : false,
    userinfo: {
        email: cloudInfo?.content?.email ?? "",
        userSig: userSig ?? "",
        nick: nick ?? "",
        selfSignature: selfSignature ?? "",
        userID: userID ?? "",
        fileID: fileID ?? "",
        avatar: "",
    },
}
export const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<IadminState>) => {
            state.isLogin = true
            const { email, userSig } = action.payload.userinfo
            state.userinfo.email = email
            state.userinfo.userSig = userSig
        },
        logout: (state) => {
            state.isLogin = false
            state.userinfo = {}
        },
        updateUserInfo: (state, action: PayloadAction<IUserInfo>) => {
            const { nick, selfSignature, fileID, userID, avatar } =
                action.payload
            if (nick) state.userinfo.nick = nick
            if (selfSignature) state.userinfo.selfSignature = selfSignature
            if (fileID) state.userinfo.fileID = fileID
            if (userID) state.userinfo.userID = userID
            if (avatar) state.userinfo.avatar = avatar
        },
        save_im_userinfo: (state, action) => {
            const IMuserinfo = action.payload
            state.userinfo.nick = IMuserinfo.nick
            state.userinfo.selfSignature = IMuserinfo.selfSignature
            state.userinfo.fileID = IMuserinfo.fileID
        },
    },
})

// Action creators are generated for each case reducer function
export const { login, logout, updateUserInfo, save_im_userinfo } =
    homeSlice.actions
export const selectUserInfo = (state: RootState) => state.home

export const updateAvatarAsync = (fileID) => (dispatch) => {
    api_getTempFileURL([fileID]).then((data) => {
        const { tempFileURL } = data.fileList[0]
        dispatch(updateUserInfo({ avatar: tempFileURL }))
    })
}
export default homeSlice.reducer
