import React, { useState } from 'react';
import Chat from './Chat';

const RoomSwitcher = () => {
    const [room, setRoom] = useState('room1');

    return (
        <div className="room-switcher">
            <div className="switcers">
                <button onClick={() => setRoom('room1')} className={room === 'room1' ? 'active' : ''}>
                    Room 1</button>
                <button onClick={() => setRoom('room2')} className={room === 'room2' ? 'active' : ''}>
                    Room 2</button>
                <button onClick={() => setRoom('room3')} className={room === 'room3' ? 'active' : ''}>
                    Room 3</button>
                <button onClick={() => setRoom('room4')} className={room === 'room4' ? 'active' : ''}>
                    Room 4</button>
            </div>
            <Chat room={room} />
        </div>
    );
};

export default RoomSwitcher;
