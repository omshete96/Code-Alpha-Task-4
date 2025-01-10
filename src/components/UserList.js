import React from 'react';

const UserList = ({ users }) => {
    return (
        <div>
            <h3>Active Users:</h3>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>{user.socketId}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
