import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client'; // Import the socket.io-client

const socket = io('http://localhost:5000'); // Establish socket connection

const DocumentEditor = ({ documentId }) => {
    const [documentContent, setDocumentContent] = useState('');
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // Fetch document content from the backend
        fetch(`http://localhost:5000/api/documents/${documentId}`)
            .then((response) => response.json())
            .then((data) => setDocumentContent(data.content));

        // Join document room when the component is mounted
        socket.emit('joinDocument', documentId);

        // Listen for document updates from other users
        socket.on('editDocument', (data) => {
            if (data.documentId === documentId) {
                setDocumentContent(data.content);
            }
        });

        // Listen for cursor movements from other users
        socket.on('cursorMove', (data) => {
            if (data.documentId === documentId) {
                setCursorPosition(data.cursor);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [documentId]);

    const handleChange = (e) => {
        setDocumentContent(e.target.value);
        // Emit document change to other users
        socket.emit('editDocument', { documentId, content: e.target.value });
    };

    const handleCursorMove = (e) => {
        const cursor = { x: e.clientX, y: e.clientY };
        setCursorPosition(cursor);
        socket.emit('cursorMove', { documentId, cursor });
    };

    return (
        <div>
            <textarea
                value={documentContent}
                onChange={handleChange}
                onMouseMove={handleCursorMove}
                rows="20"
                cols="50"
            />
        </div>
    );
};

export default DocumentEditor;
