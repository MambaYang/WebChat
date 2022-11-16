import { Link } from "react-router-dom"
import "./welcome.less"
function WelcomeIndex() {
    return (
        <div className="welcome-box">
            <article>Welcome to WebChat</article>
            <div className="selection">
                <div className="selection-item">
                    <Link to="./login">登录</Link>
                </div>
                <div className="selection-item">
                    <Link to="./register">注册</Link>
                </div>
            </div>
        </div>
    )
}

export default WelcomeIndex
