import React, {useEffect, useRef, useState} from "react";

const Message = ({ content }) => (
    <div className="message-conreiner">
        <div className="message">
            {content}
        </div>
    </div>
);

const Chat = ({room}) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState({
        room1: [],
        room2: [],
        room3: [],
        room4: [],
    });

    const socketRefs = useRef({});

    useEffect(() => {
        // Create a WebSocket connection for each room
        ['room1', 'room2', 'room3', 'room4'].forEach((room) => {
            if (!socketRefs.current[room]) {
                socketRefs.current[room] = new WebSocket(`ws://localhost:8000/ws/chat/${room}/`);

                socketRefs.current[room].onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    const messageContent = data.message;

                    setMessages((prevMessages) => {
                        const newMessages = {
                            ...prevMessages,
                            [room]: [...(prevMessages[room] || []), messageContent],
                        };

                        localStorage.setItem('messages', JSON.stringify(newMessages));
                        return newMessages;
                    });
                };
            }
        });

        // Load saved messages
        const savedMessages = localStorage.getItem('messages');
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        }

        const currentSocketRefs = socketRefs.current;

        return () => {
            // Close all WebSocket connections when the component unmounts
            Object.values(currentSocketRefs).forEach((socketRef) => {
                if (socketRef.readyState === 1) {
                    socketRef.close();
                }
            });
        };
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            // Send the message to the current room
            socketRefs.current[room].send(JSON.stringify({ message }));
            setMessage("");
        }
    };

    return (
        <div className="chat-container">
            <div className="input-wrapper">
                <input placeholder="Enter your message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                />
                <button className="send-button" onClick={sendMessage}>Send</button>
            </div>
            <div className="messages">
                {messages[room] && messages[room].map((message, i) => <Message key={i} content={message} />)}
            </div>
        </div>
    );
};

export default Chat;