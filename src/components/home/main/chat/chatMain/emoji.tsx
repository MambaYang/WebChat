import { message, Tabs } from "antd"
import { useEffect, useRef, useState } from "react"
import * as unicodeEmoji from "unicode-emoji"
import {
    api_AddEmojiUrl,
    api_GetEmojiUrl,
    api_getTempFileURL,
    api_uploadEmoji,
} from "../../../../../api"
import MyIcon from "../../../../../assets/MyIcon"
import { useAppSelector } from "../../../../../hooks"
import { selectUserInfo } from "../../../homeSlice"
const emojiObj = unicodeEmoji.getEmojisGroupedBy("group")

type emojiItemType = {
    emoji: string
}
type Props = {
    setValue: Function
    areaValue: string
    setOpen: Function
    inputRef: any
}
function Emoji({ setValue, areaValue, setOpen, inputRef }: Props) {
    const { userinfo } = useAppSelector(selectUserInfo)
    const [prevEmoji, setPrevEmoji] = useState([])
    const [selfEmojiList, setSelfEmojiList] = useState([])
    const emojiRef = useRef(null)
    // 渲染表情列表
    const emojiItem = (category: string): React.ReactNode => {
        const onClickHandle = (
            e: React.MouseEvent<HTMLUListElement, MouseEvent>
        ) => {
            const val = e.target as HTMLElement
            if (val.tagName === "UL") return

            // 插入表情
            let timer = null
            clearTimeout(timer)
            // 获取光标位置
            let { selectionStart, selectionEnd } =
                inputRef.current.resizableTextArea.textArea

            if (prevEmoji.includes(selectionStart - 1)) {
                selectionStart++
                selectionEnd++
            }

            const newVal =
                areaValue.substring(0, selectionStart) +
                val.innerHTML +
                areaValue.substring(selectionEnd)
            const newprevEmoji = prevEmoji.slice()
            if (!prevEmoji.includes(selectionStart))
                newprevEmoji.push(selectionStart)
            setPrevEmoji(newprevEmoji)

            setValue(newVal)

            timer = setTimeout(() => {
                // 移动光标到表情后面
                inputRef.current.resizableTextArea.textArea.setSelectionRange(
                    ++selectionEnd,
                    selectionEnd
                )
                inputRef.current.focus()
            })
            setOpen(false)
        }
        return (
            <ul className="emoji-ul" onClick={onClickHandle}>
                {emojiObj[category].map(
                    (item: emojiItemType, index: number) => (
                        <li key={index}>{item.emoji}</li>
                    )
                )}
            </ul>
        )
    }
    const selfEmoji = () => {
        return (
            <div className="self-emoji-box">
                <div
                    onClick={() => {
                        emojiRef.current.click()
                    }}
                >
                    <MyIcon type="icon-add" style={{ fontSize: "50px" }} />
                    <input
                        type="file"
                        ref={emojiRef}
                        onChange={async (e) => {
                            const res = await api_uploadEmoji(e.target.files[0])
                            console.log(res)

                            const url = res.fileID.slice(
                                res.fileID.indexOf("emoji")
                            )
                            const emojiRes = await api_AddEmojiUrl(
                                url,
                                userinfo.userID
                            )

                            message.success("上传表情成功😊")
                        }}
                        style={{ display: "none" }}
                    />
                </div>
                {selfEmojiList.map((item: any, index: number) => (
                    <div key={index}>
                        <img src={item.tempFileURL} alt="自定义表情" />
                    </div>
                ))}
            </div>
        )
    }
    // 配置表情标签页
    const items = [
        {
            label: "😀",
            key: "smileys-emotion",
            children: emojiItem("smileys-emotion"),
        }, // 务必填写 key
        { label: "🍊", key: "food-drink", children: emojiItem("food-drink") },
        { label: "🫥", key: "self-emoji", children: selfEmoji() },
    ]
    const getSelfEmojiUrl = async () => {
        const { data } = await api_GetEmojiUrl(userinfo.userID)
        if (data.length) {
            const { fileList } = await api_getTempFileURL(data[0].fileIDs)
            setSelfEmojiList(fileList)
        }
    }
    useEffect(() => {
        getSelfEmojiUrl()
    }, [])
    return <Tabs items={items} tabPosition="bottom" />
}

export default Emoji
