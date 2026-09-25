import "./Chat.css";
import { useContext, useEffect, useState , useRef} from "react";
import { MyContext } from "./MyContext";
import ReactMarkDown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function Chat() {

    const {newChat, prevChats ,reply , currThreadId} = useContext(MyContext);
    const[latestReply, setLatestReply] = useState(null);

    const chatContainerRef = useRef(null);

    useEffect(() => {
        const chatContainer = chatContainerRef.current;

        if (!chatContainer) return;

        const isAtBottom =
            chatContainer.scrollHeight - chatContainer.scrollTop <=
            chatContainer.clientHeight + 100;

        if (isAtBottom) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, [prevChats, latestReply]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = 0;
        }
    }, [currThreadId]);

    useEffect( () => {

        if(reply === null){
            setLatestReply(null);
            return;
        }
        
        if(!prevChats?.length) return;

        const content = reply.split(" ");

        let idx = 0;
        const interval = setInterval(() => {
            setLatestReply(content.slice(0, idx+1).join(" "));

            idx++;
            if(idx >= content.length) clearInterval(interval);
        } , 40);

        return () => clearInterval(interval);

    },[prevChats,reply])

    return (
        <>  
            {newChat && <h1>Start a New Chat!</h1>}
            <div className="chats" ref={chatContainerRef}>

                {
                    prevChats?.slice(0,-1).map((chat,idx) => 
                        <div className={chat.role === "user" ? "userDiv" : "gptDiv"}key={idx}>
                            {
                                chat.role === "user"?
                                <p className="userMessage">{chat.content}</p>:
                                <ReactMarkDown rehypePlugins={[rehypeHighlight]}>{chat.content}</ReactMarkDown>
                            }
                        </div>
                    )
                }

                {
                    prevChats.length > 0 && (
                        <>
                            {
                                latestReply === null ? (
                                    <div className="gptDiv" key={"non-typing"}>
                                        <ReactMarkDown rehypePlugins={[rehypeHighlight]}>{prevChats[prevChats.length-1].content}</ReactMarkDown>
                                    </div>
                                ) : (
                                    <div className="gptDiv" key={"typing"}>
                                        <ReactMarkDown rehypePlugins={[rehypeHighlight]}>{latestReply}</ReactMarkDown>
                                    </div>
                                )
                            }
                        </>
                    )
                }
            </div>
        </>
    )
}

export default Chat;


