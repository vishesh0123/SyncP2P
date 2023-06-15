import React, { useState } from 'react'
import UploadFile from '../components/UploadFile';

export default function Main() {
    const [uploadFile, setUploadFile] = useState(true);
    return (
        <>
            <div style={{ 'display': 'flex', 'flexDirection': 'row' }}>
                <div style={{ 'width': '80%' }}>
                    <h1 align="center">
                        WebRTC P2P Connection Without Signaling Server for Collaborative editing
                    </h1>
                    <button>Upload A TXT File and Invite</button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <button onClick={() => { setUploadFile(false) }}>Accept Invite to Collaborate</button>
                </div>
                <div style={{ 'backgroundColor': 'black', 'width': '20%', 'height': '300px', 'margin': "10px" }}>

                </div>
            </div>
            <UploadFile />
        </>
    )
}
