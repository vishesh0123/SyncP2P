import React, { useEffect, useState } from 'react'

export default function PeerDiscovery() {
    const [connection, setConnection] = useState(null)
    const [chan, setChan] = useState(null)
    const [isBroadcaster, setIsBroadcaster] = useState(true)

    const createConnection = () => {
        const iceConfiguration = {}
        iceConfiguration.iceServers = [
            {
                urls: ['stun:stun.cablenet-as.net:3478', 'stun:stun.l.google.com:19302']
            }
        ];
        const peerConnection = new RTCPeerConnection(iceConfiguration)
        peerConnection.addEventListener('negotiationneeded', async (e) => { window.alert("Negotiation Needed") })
        peerConnection.addEventListener('icecandidate', async (e) => { console.log(e) })
        setConnection(peerConnection);
    }
    const createOffer = async () => {

        const offer = await connection.createOffer()
        await connection.setLocalDescription(offer)
        console.log(JSON.stringify(offer))
        document.getElementById("sdp-offer").value = JSON.stringify(offer);


    }

    const createAnswer = async () => {

        await connection.setRemoteDescription(new RTCSessionDescription(JSON.parse(document.getElementById('peer-sdp-offer').value)))
        const answer = await connection.createAnswer();
        await connection.setLocalDescription(answer)
        document.getElementById('peer-answer').value = JSON.stringify(answer)
        console.log(connection)
    }
    const createDataChannel = async () => {

        const channel = connection.createDataChannel("chat")
        setChan(channel)
        channel.onopen = (event) => {
            channel.send("Hi you!");
        };
        channel.onmessage = (event) => {
            document.getElementById('received').value = document.getElementById('received').value + "\n" + event.data
        };
        console.log(connection)
    }

    const send = async () => {
        if (isBroadcaster) {
            chan.send(document.getElementById('send').value)
        } else {
            chan.send(document.getElementById('peer-send').value)
        }

    }

    const listen = async () => {

        connection.ondatachannel = (event) => {
            const channel = event.channel;
            setChan(channel)
            channel.onopen = (event) => {
                channel.send("Hi back!");
            };
            channel.onmessage = (event) => {
                document.getElementById('peer-received').value = document.getElementById('peer-received').value + "\n" + event.data
            };
        };
    }

    const setLocal = async () => {
        await connection.setRemoteDescription(new RTCSessionDescription(JSON.parse(document.getElementById("sdp-answer").value)))
    }



    return (
        <>
            <p>Welcome to SyncP2P Enviornment</p>
            <p>Choose Options from Below</p>
            <br />
            <br />

            <button onClick={() => { setIsBroadcaster(false) }}>I want to coonect to Peer</button>

            {isBroadcaster && <>
                <p>You are now Broadcaster</p>
                <button onClick={() => { createConnection() }}>Craete PeerConnectionObject</button>
                &nbsp;&nbsp;&nbsp;
                <button onClick={() => { createOffer() }}>Create Offer</button>
                <br />
                <br />
                {connection && <textarea id='sdp-offer'>{connection.localDescription}</textarea>}
                <br />
                <p>Paste Answer below</p>
                <textarea id='sdp-answer'>Paste answer sdp here</textarea>
                <br />
                <br /><br />
                <button onClick={() => { createDataChannel() }}>Create Data Channel</button> &nbsp;
                <button onClick={() => setLocal()}>Set answer to local localDescription</button>
                <textarea id='received'>Received Messages</textarea>&nbsp;
                <textarea id="send">To send Messages</textarea>&nbsp;&nbsp;&nbsp;
                <button onClick={() => { send() }}>Send Message</button>
            </>}
            {!isBroadcaster && <>
                <p>You are now peer </p>
                <button onClick={() => { createConnection() }}>Craete PeerConnectionObject</button>
                <p>Paste SDP OFFER HERE</p>
                <textarea id='peer-sdp-offer'>PASTE SDP OFFER FROM BROADCASTER</textarea>
                <br />
                <button onClick={() => { createAnswer() }}>Create Answer</button>
                <br />
                <textarea id='peer-answer'>answer created for sdp offer</textarea>
                <br /><br />
                <button onClick={() => { listen() }}>Listen on data channels</button>
                <br />

                <textarea id="peer-received">Received Messages</textarea>&nbsp;
                <textarea id="peer-send">Send messages</textarea>&nbsp;&nbsp;
                <button onClick={() => { send() }}>Send</button>
            </>}

        </>
    )
}
