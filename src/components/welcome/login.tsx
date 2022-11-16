import {
    LockOutlined,
    MailOutlined,
    MobileOutlined,
    UserOutlined,
} from "@ant-design/icons"
import {
    LoginForm,
    ProFormCaptcha,
    ProFormCheckbox,
    ProFormText,
} from "@ant-design/pro-components"
import { message, Tabs } from "antd"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import type { loginSubmitVal, resErrorType } from "../../@types"
import { auth } from "../../api"
import genTestUserSig from "../../assets/UserSig"
import "./login.less"
import { useAppDispatch } from "../../hooks"
import { login } from "../home/homeSlice"

type LoginType = "phone" | "account"

const tabsItems = [
    { label: "账号密码登录", key: "account" },
    { label: "手机号登录", key: "phone" },
]
function Login() {
    const [loginType, setLoginType] = useState<LoginType>("account")
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    // 点击登录
    const onSubmit = async ({ email, password }: loginSubmitVal) => {
        // 登录云平台
        const loginStatus = await auth.signInWithEmailAndPassword(
            email,
            password
        )

        if (!loginStatus.user) {
            message.error("登录失败！")
            return
        }
        message.success("登录成功！")
        const { userSig } = genTestUserSig(email)
        localStorage.setItem("userSig", userSig)
        const adminState = {
            isLogin: true,
            userinfo: {
                email,
                userSig,
            },
        }
        // 分发redux状态
        dispatch(login(adminState))

        navigate("/home/chat")
    }
    return (
        <div className="login">
            <LoginForm
                logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
                title="WaChat"
                subTitle="全球最大的交友聊天软件"
                initialValues={{ remember: true }}
                onFinish={onSubmit}
                validateTrigger="onBlur"
            >
                <Tabs
                    centered
                    activeKey={loginType}
                    onChange={(activeKey) =>
                        setLoginType(activeKey as LoginType)
                    }
                    items={tabsItems}
                ></Tabs>
                {loginType === "account" && (
                    <>
                        <ProFormText
                            name="email"
                            fieldProps={{
                                size: "large",
                                prefix: <MailOutlined />,
                            }}
                            placeholder={"邮箱"}
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
                        />
                        <ProFormText.Password
                            name="password"
                            fieldProps={{
                                size: "large",
                                prefix: (
                                    <LockOutlined className={"prefixIcon"} />
                                ),
                            }}
                            placeholder={"密码"}
                            rules={[
                                {
                                    required: true,
                                    message: "请输入密码！",
                                },
                                {
                                    message: "请输入大于8个小于16个字符的密码!",
                                    max: 16,
                                    min: 8,
                                },
                            ]}
                        />
                    </>
                )}
                {loginType === "phone" && (
                    <>
                        <ProFormText
                            fieldProps={{
                                size: "large",
                                prefix: (
                                    <MobileOutlined className={"prefixIcon"} />
                                ),
                            }}
                            name="mobile"
                            placeholder={"手机号"}
                            rules={[
                                {
                                    required: true,
                                    message: "请输入手机号！",
                                },
                                {
                                    pattern: /^1\d{10}$/,
                                    message: "手机号格式错误！",
                                },
                            ]}
                        />
                        <ProFormCaptcha
                            fieldProps={{
                                size: "large",
                                prefix: (
                                    <LockOutlined className={"prefixIcon"} />
                                ),
                            }}
                            captchaProps={{
                                size: "large",
                            }}
                            placeholder={"请输入验证码"}
                            captchaTextRender={(timing, count) => {
                                if (timing) {
                                    return `${count} ${"获取验证码"}`
                                }
                                return "获取验证码"
                            }}
                            name="captcha"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入验证码！",
                                },
                            ]}
                            onGetCaptcha={async () => {
                                message.success(
                                    "获取验证码成功！验证码为：1234"
                                )
                            }}
                        />
                    </>
                )}
                <div
                    style={{
                        marginBlockEnd: 24,
                    }}
                >
                    <ProFormCheckbox noStyle name="autoLogin">
                        自动登录
                    </ProFormCheckbox>
                    <a
                        style={{
                            float: "right",
                        }}
                    >
                        忘记密码
                    </a>
                </div>
            </LoginForm>
        </div>
    )
}

export default Login
