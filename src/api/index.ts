import cloudbase from "@cloudbase/js-sdk"
import "@cloudbase/js-sdk/auth"
import axios from "axios"
import genTestUserSig from "../assets/UserSig"

const app = cloudbase.init({
    env: "mamba-3giisytd4efcf526",
    // clientId: "AAU5PwABb7WUWvYbTDQ", // 应用ID
})
export const auth: any = app.auth({
    persistence: "local",
})
const db = app.database()

const _ = db.command

// 请求TIM添加新注册用户
export const $Req_addUser = (username: string) => {
    const { userSig } = genTestUserSig("administrator")
    const options = {
        method: "POST",
        url: "https://console.tim.qq.com/v4/im_open_login_svc/account_import",
        params: {
            sdkappid: "1400746817",
            identifier: "administrator",
            usersig: userSig,
            random: "3375945129",
            contenttype: "json",
        },
        data: {
            UserID: username,
            Nick: "",
            FaceUrl: "未设置",
            selfSignature: "未设置签名",
        },
    }
    return axios.request(options)
}

// 上传头像
export const api_uploadAvatar = (file: File) => {
    const cloudPath = "avatar/" + file.name
    return app.uploadFile({
        cloudPath,
        filePath: file,
        // onUploadProgress: (progressEvent: any) => {
        //     // console.log(progressEvent)
        // },
    })
}
// 上传表情
export const api_uploadEmoji = (file: File) => {
    const cloudPath = "emoji/" + file.name
    return app.uploadFile({
        cloudPath,
        filePath: file,
        // onUploadProgress: (progressEvent: any) => {
        //     // console.log(progressEvent)
        // },
    })
}

export const api_insertEmojiUrlArray = (userID: string) => {
    return db.collection("emoji").add({
        _id: userID,
        fileIDs: [],
    })
}
export const api_GetEmojiUrl = (userID: string) => {
    return db.collection("emoji").doc(userID).get()
}

export const api_AddEmojiUrl = (url: string, userID: string) => {
    return db
        .collection("emoji")
        .doc(userID)
        .update({
            fileIDs: _.push(url),
        })
}

// 根据文件id获取临时文件链接
export const api_getTempFileURL = (fileIds: string[]) => {
    const prevUrl =
        "cloud://mamba-3giisytd4efcf526.6d61-mamba-3giisytd4efcf526-1259220580/"
    const overfileIds = fileIds.map((item) => prevUrl + item)
    return app.getTempFileURL({
        fileList: overfileIds,
    })
}
