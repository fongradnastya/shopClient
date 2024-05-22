import React from 'react';


const Profile = ({ username }) => {

    const logout = () => {
        // Add your logout logic here
        history.push('/login');
    };

    return (
        <div>
            <h2>Profile</h2>
            <p>Username: {username}</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Profile;
