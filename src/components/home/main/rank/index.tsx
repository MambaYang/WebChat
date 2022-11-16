import { useEffect, useState } from "react"
import { useHomeContent } from "../../home"
import "./index.less"
interface IRankItem {
    nick: string
    number: number
}
function Rank() {
    const { friendList }: any = useHomeContent()
    const [rankList, setRankList] = useState<IRankItem[]>([])
    const getRankList = () => {
        const rank: IRankItem[] = []
        for (let item of friendList) {
            const rankItem: IRankItem = {
                nick: item.nick,
                number: Math.floor(Math.random() * 100),
            }
            rank.push(rankItem)
        }
        rank.sort((a, b) => b.number - a.number)
        setRankList(rank)
    }

    useEffect(() => {
        getRankList()
    }, [])
    return (
        <div className="rank">
            <div
                style={{
                    margin: " 50px auto",
                    boxShadow: "0 0 3px rgb(197, 197, 197)",
                    padding: "20px",
                    borderRadius: "10px",
                    width: "fit-content",
                    background: "rgba(255, 255, 255,0.5)",
                }}
                className="rank-box"
            >
                <header
                    style={{
                        fontSize: "24px",
                        textAlign: "center",
                        marginBottom: "20px",
                    }}
                >
                    亲密度排行榜
                </header>
                <main>
                    <ul>
                        <li
                            style={{
                                display: "flex",
                                minWidth: "250px",
                                fontSize: "20px",
                                justifyContent: "space-between",
                                marginBottom: "10px",
                                padding: "5px 10px",
                            }}
                        >
                            <span>昵称</span>
                            <span>亲密度</span>
                        </li>
                        {rankList.map((item, index) => (
                            <li
                                key={index}
                                style={{
                                    display: "flex",
                                    minWidth: "250px",
                                    fontSize: "18px",
                                    justifyContent: "space-between",
                                    backgroundColor:
                                        index & 1
                                            ? "white"
                                            : "rgb(238, 238, 238)",
                                    padding: "5px 10px",
                                    color: "rgb(120, 120, 120)",
                                }}
                            >
                                <span>{item.nick}</span>
                                <span>{item.number}</span>
                            </li>
                        ))}
                    </ul>
                </main>
            </div>
        </div>
    )
}

export default Rank
