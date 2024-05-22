import React, {useState} from 'react';
import notificationOn from "./img/icons/notification-on.svg";
import notificationOff from "./img/icons/notification-off.svg";

const NotificationHandler = () => {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [webSocket, setWebSocket] = useState(null);

    const handleSubscribe = () => {
        setIsSubscribed(true);

        const ws = new WebSocket('ws://localhost:8000/ws/notifications/')
        setWebSocket(ws);

        ws.onmessage = (e) => {
            const data = JSON.parse(e.data)
            console.log(data)
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    let notif =new Notification(data.message);
                    console.log("Sended");
                    console.log(notif);
                }
            });
        }

        ws.onclose = (e) => {
            console.error('Chat socket closed unexpectedly')
        }
    }

    const handleUnsubscribe = () => {
        setIsSubscribed(false);
        if (webSocket) {
            webSocket.close();
        }
    }

    return (
        <div>
            {isSubscribed ? (
                <img src={notificationOn} alt="Set notifications off" onClick={handleUnsubscribe}/>
            ) : (
                <img src={notificationOff} alt="Set notifications on" onClick={handleSubscribe}/>
            )}
        </div>
    );
}

export default NotificationHandler;
