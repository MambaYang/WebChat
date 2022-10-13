import { SearchOutlined } from "@ant-design/icons"
import { Input, Avatar, List } from "antd"
import { useState } from "react"
import "./index.less"
const data = [
    {
        title: "用户昵称用户昵称用户昵称用户昵称",
    },
    {
        title: "啊哈哈",
    },
    {
        title: "非得多少",
    },
    {
        title: "a人尬的",
    },
    {
        title: "用户昵称用户昵称用户昵称用户昵称",
    },
    {
        title: "啊哈哈",
    },
    {
        title: "非得多少",
    },
    {
        title: "a人尬的",
    },
    {
        title: "用户昵称用户昵称用户昵称用户昵称",
    },
    {
        title: "啊哈哈",
    },
    {
        title: "啊哈哈",
    },
    {
        title: "非得多少",
    },
    {
        title: "a人尬的",
    },
    {
        title: "用户昵称用户昵称用户昵称用户昵称",
    },
    {
        title: "啊哈哈",
    },
]
function ChatAside() {
    const [isShowDialog, setShowDialog] = useState<boolean>(false)
    return (
        <>
            <header className="aside-header">
                <div className="aside-header-box">
                    <Input
                        placeholder="搜索已添加好友"
                        prefix={<SearchOutlined />}
                        size="middle"
                        style={{ width: "200px" }}
                        onFocus={() => setShowDialog(true)}
                        onBlur={() => setShowDialog(false)}
                    />
                    {isShowDialog && (
                        <>
                            <div className="search-dialog">
                                <ul>
                                    <li>
                                        <Avatar
                                            shape="square"
                                            src="https://joeschmoe.io/api/v1/random"
                                        />
                                        <span>昵称1</span>
                                    </li>
                                    <li>
                                        <Avatar src="https://joeschmoe.io/api/v1/random" />
                                        <span>昵称2</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="dialog-shade"></div>
                        </>
                    )}
                </div>

                {/* <div>
                    <Button
                        type="primary"
                        icon={<SearchOutlined />}
                        href="https://www.google.com"
                        size="small"
                    />
                </div> */}
            </header>
            <main className="aside-main">
                <List
                    itemLayout="horizontal"
                    split={false}
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={
                                    <Avatar src="https://joeschmoe.io/api/v1/random" />
                                }
                                title={
                                    <>
                                        <span>{item.title}</span>

                                        <span>2020/02/02</span>
                                    </>
                                }
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                        </List.Item>
                    )}
                />
            </main>
        </>
    )
}

export default ChatAside
