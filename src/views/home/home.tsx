import Nav from "../../components/home/nav"
import Container from "../../components/home/main"
import "./home.less"
function Home() {
    return (
        <div className="home-box">
            <div className="home-nav">
                <Nav />
            </div>
            <div className="home-main">
                <Container />
            </div>
        </div>
    )
}

export default Home
