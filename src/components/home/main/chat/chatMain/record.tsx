import { List, message, Modal } from "antd"
import { useRef, useState } from "react"
import { IMgetMessageList } from "../../../../../api/TIM"
import MyIcon from "../../../../../assets/MyIcon"
import VirtualList from "rc-virtual-list"
import { unix } from "dayjs"
type Props = {
    activeConversation: any
}
const ContainerHeight = 400
function Record({ activeConversation }: Props) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [nextReqMessageIDState, setnextReqMessageID] = useState(undefined)
    const [recordList, setRecordList] = useState([])

    const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
        if (
            e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
            ContainerHeight
        ) {
            if (nextReqMessageIDState !== "")
                getMessageList(nextReqMessageIDState)
        }
    }
    const showModal = () => {
        setIsModalOpen(true)
        getMessageList(undefined)
    }

    const handleOk = () => {
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setRecordList([])
        setIsModalOpen(false)
        setnextReqMessageID(undefined)
    }
    const getMessageList = async (nextReqMessageID) => {
        const { data } = await IMgetMessageList(
            activeConversation.conversationID,
            nextReqMessageID
        )
        if (data.isCompleted) {
            message.warn("到底了！😊")
        }
        setnextReqMessageID(data.nextReqMessageID)
        setRecordList(recordList.concat(data.messageList))
    }
    return (
        <>
            <MyIcon
                type="icon-record"
                style={{ fontSize: "32px" }}
                onClick={showModal}
            />
            <Modal
                title="聊天记录"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                mask={false}
            >
                <List>
                    <VirtualList
                        data={recordList}
                        height={ContainerHeight}
                        itemHeight={47}
                        itemKey="ID"
                        onScroll={onScroll}
                    >
                        {(item) => (
                            <List.Item key={item.ID}>
                                <List.Item.Meta
                                    //   avatar={<Avatar src={item.picture.large} />}
                                    title={
                                        <>
                                            <span>{item.nick}</span>
                                            <span
                                                style={{
                                                    float: "right",
                                                    fontSize: "12px",
                                                }}
                                            >
                                                {unix(item.clientTime).format(
                                                    "YYYY/MM/DD"
                                                )}
                                            </span>
                                        </>
                                    }
                                    description={item.payload.text}
                                />
                            </List.Item>
                        )}
                    </VirtualList>
                </List>
            </Modal>
        </>
    )
}
export default Record
