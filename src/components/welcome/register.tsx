import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Checkbox, Form, Input } from "antd"
import "./register.less"
function Register() {
    const onFinish = (values: any) => {
        console.log("Received values of form: ", values)
    }
    return (
        <div className="register">
            <div className="ant-pro-form-login-top  ">
                <div className="ant-pro-form-login-header ">
                    <span className="ant-pro-form-login-logo ">
                        <img src="https://github.githubassets.com/images/modules/logos_page/Octocat.png" />
                    </span>
                    <span className="ant-pro-form-login-title ">WaChat</span>
                </div>
                <div className="ant-pro-form-login-desc ">
                    全球最大的交友聊天软件
                </div>
            </div>

            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                size="large"
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "请输入您的用户名!",
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="用户名：必填"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "请输入您的密码!",
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="密码：必填"
                    />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "请输入您的邮箱!",
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="邮箱：必填"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>自动登录</Checkbox>
                    </Form.Item>
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                    >
                        注册并登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Register
