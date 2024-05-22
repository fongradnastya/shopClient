// Import the functions you need from the SDKs you need
import notificationOn from "./img/icons/notification-on.svg";
import notificationOff from "./img/icons/notification-off.svg";
import React, {useEffect, useState} from "react";
import { getToken } from "firebase/messaging";
import { messaging } from "./firebase/firebaseConfig";

const FirebaseHandler = () => {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [webSocket, setWebSocket] = useState(null);
    const { VITE_APP_VAPID_KEY } = import.meta.env;

    useEffect(async () => {
        const permission = await Notification.requestPermission();

        if (permission === "granted") {
            const token = await getToken(messaging, {
                vapidKey: VITE_APP_VAPID_KEY,
            });

            //We can send token to server
            console.log("Token generated : ", token);
        } else if (permission === "denied") {
            //notifications are blocked
            alert("You denied for the notification");
        }
    }, [VITE_APP_VAPID_KEY]);

    const handleSubscribe = async () => {
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

    const handleUnsubscribe = async () => {
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

export default FirebaseHandler;