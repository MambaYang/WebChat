import TIM from "tim-js-sdk/tim-js-friendship"

// import TIMUploadPlugin from "tim-upload-plugin"
let options = {
    SDKAppID: 1400746817, // 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
    oversea: true, //海外支持
}
// 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
let tim = TIM.create(options) // SDK 实例通常用 tim 表示

// 设置 SDK 日志输出级别，详细分级请参见 <a href="https://web.sdk.qcloud.com/im/doc/zh-cn/SDK.html#setLogLevel">setLogLevel 接口的说明</a>
tim.setLogLevel(0) // 普通级别，日志量较多，接入时建议使用
// tim.setLogLevel(1); // release 级别，SDK 输出关键信息，生产环境时建议使用
// 注册腾讯云即时通信 IM 上传插件
// tim.registerPlugin({ "tim-upload-plugin": TIMUploadPlugin })

// 添加好友
export const IMaddFriend = async (options: any) => {
    return tim.addFriend(options)
}
// 发送消息
export const IMsendMessage = (sendMessage: string, userID: string) => {
    // 发送文本消息，Web 端与小程序端相同
    // 1. 创建消息实例，接口返回的实例可以上屏
    const createdMessage = tim.createTextMessage({
        to: userID,
        conversationType: TIM.TYPES.CONV_C2C,

        payload: {
            text: sendMessage,
        },
        // v2.20.0起支持C2C消息已读回执功能，如果您发消息需要已读回执，需购买旗舰版套餐，并且创建消息时将 needReadReceipt 设置为 true
        needReadReceipt: true,
        // 消息自定义数据（云端保存，会发送到对端，程序卸载重装后还能拉取到，v2.10.2起支持）
        // cloudCustomData: 'your cloud custom data'
    })
    // 2. 发送消息
    return tim.sendMessage(createdMessage)
}
// 获取消息记录列表
export const IMgetMessageList = (
    conversationID: string,
    nextReqMessageID: string | undefined = undefined
) => {
    return tim.getMessageList({
        conversationID: conversationID,
        nextReqMessageID: nextReqMessageID,
    })
}

// const onSdkReady = function (event) {
//     console.warn("********ready*********")
//     getMyInfo()
//     getConversationList()
// }
// tim.on(TIM.EVENT.SDK_READY, onSdkReady)
// let onSdkNotReady = function (event) {
//     // 如果想使用发送消息等功能，接入侧需驱动 SDK 进入 ready 状态，重新调用 login 接口即可，如下所示：
//     // tim.login({userID: 'your userID', userSig: 'your userSig'});
//     console.log("noready")
// }
// tim.on(TIM.EVENT.SDK_NOT_READY, onSdkNotReady)

export default tim
export const IMLogin = tim.login
export const IMLogout = tim.logout
export const IMUpdateMyProfile = tim.updateMyProfile
export const IMGetConversationList = tim.getConversationList
export const IMgetFriendList = tim.getFriendList
export const IMgetMyProfile = tim.getMyProfile
export const IMsetMessageRead = tim.setMessageRead
export const IMdeleteFriend = tim.deleteFriend

export const _TIMEVENT = TIM.EVENT
export const _TIMTYPE = TIM.TYPES
