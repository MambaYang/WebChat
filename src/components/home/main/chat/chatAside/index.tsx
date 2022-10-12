import { PlusOutlined, SearchOutlined } from "@ant-design/icons"
import { Button, Input, Avatar, List, Divider } from "antd"
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
    return (
        <>
            <header className="aside-header">
                <div>
                    <Input
                        placeholder="搜索已添加好友"
                        prefix={<SearchOutlined />}
                        size="middle"
                        style={{ width: "200px" }}
                    />
                </div>

                <div>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        href="https://www.google.com"
                        size="small"
                    />
                </div>
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
