import { Tabs } from "antd"
import * as unicodeEmoji from "unicode-emoji"
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
            setValue(
                areaValue.substr(0, selectionStart) +
                    val.innerHTML +
                    areaValue.substr(selectionEnd)
            )

            timer = setTimeout(() => {
                // 移动光标到表情后面
                inputRef.current.resizableTextArea.textArea.setSelectionRange(
                    ++selectionEnd,
                    selectionEnd
                )
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
    // 配置表情标签页
    const items = [
        {
            label: "😀",
            key: "smileys-emotion",
            children: emojiItem("smileys-emotion"),
        }, // 务必填写 key
        { label: "🍊", key: "food-drink", children: emojiItem("food-drink") },
    ]
    return <Tabs items={items} tabPosition="bottom" />
}

export default Emoji
