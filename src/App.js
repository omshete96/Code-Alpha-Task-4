import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import DocumentEditor from './components/DocumentEditor';
import UserList from './components/UserList';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
    const [documentId, setDocumentId] = useState(''); // Assuming documentId will be dynamic
    const [users, setUsers] = useState([]);

    useEffect(() => {
        socket.emit('joinDocument', documentId);

        socket.on('userList', (userList) => {
            setUsers(userList);
        });

        socket.on('editDocument', (data) => {
            console.log('Document content updated:', data);
        });

        socket.on('cursorMove', (data) => {
            console.log('Cursor moved:', data);
        });

        return () => {
            socket.disconnect();
        };
    }, [documentId]);

    return (
        <div className="App">
            <h1>Collaborative Editor</h1>
            <UserList users={users} />
            <DocumentEditor documentId={documentId} />
        </div>
    );
}

export default App;
