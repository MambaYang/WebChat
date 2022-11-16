import {
    LockOutlined,
    MailOutlined,
    UserOutlined,
    VerifiedOutlined,
} from "@ant-design/icons"
import { Button, Checkbox, Form, Input, InputRef, message } from "antd"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import type { registerSubmitVal, resErrorType } from "../../types"
import { $Req_addUser, api_insertEmojiUrlArray, auth } from "../../api"
import { IMLogin } from "../../api/TIM"
import genTestUserSig from "../../assets/UserSig"
import "./register.less"

function Register() {
    const navigate = useNavigate()
    const [verificButton, setVerific] = useState<boolean>(false)
    // const [verificCount, setCount] = useState<number>(60)

    const emailRef = useRef<InputRef>(null)

    const onSubmit = async ({ password, email }: registerSubmitVal) => {
        try {
            const res = await auth.signUpWithEmailAndPassword(email, password)
            console.log(res)
        } catch (error) {
            message.error("此邮箱已经注册")
            return
        }

        // TIM添加账户
        const { data } = await $Req_addUser(email)
        if (!data.ErrorCode) {
            message.success("注册验证邮件发送成功!")
        }
        // 插入初始化的自定义表情数组
        const insertres = await api_insertEmojiUrlArray(email)
        // // 登录TIM
        // const { userSig } = genTestUserSig(username)
        // const tim_login_res = await IMLogin({
        //     userID: username,
        //     userSig: userSig,
        // })
        // if (tim_login_res.data.repeatLogin) {
        //     message.error(tim_login_res.data.errorInfo)
        // }
        // console.log(tim_login_res.data)
        // // 跳转
        navigate("/login")
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
                onFinish={onSubmit}
                size="large"
                validateTrigger="onBlur"
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "请输入您的邮箱!",
                        },
                        {
                            pattern:
                                /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
                            message: "请输入正确格式的邮箱!",
                        },
                    ]}
                >
                    <Input
                        prefix={<MailOutlined />}
                        placeholder="邮箱：必填"
                        ref={emailRef}
                    />
                </Form.Item>

                {/* <Form.Item
                    name="username"
                    rules={[
                        {
                            required: false,
                            message: "请输入您的用户名!",
                        },
                        {
                            message: "请输入大于6个字符小于12个字符的用户名",
                            max: 12,
                            min: 6,
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="用户名：选填"
                    />
                </Form.Item> */}
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "请输入您的密码!",
                            max: 16,
                            min: 8,
                        },
                        {
                            message: "请输入大于8个小于16位字符的密码!",
                            max: 16,
                            min: 8,
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="密码：选填"
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
                        注册
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Register
