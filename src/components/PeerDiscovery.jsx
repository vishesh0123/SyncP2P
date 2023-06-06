import React, { useState } from 'react'
import { createLibp2p } from 'libp2p'
import { noise } from '@chainsafe/libp2p-noise'
import { multiaddr } from '@multiformats/multiaddr'
import first from 'it-first'
import { pipe } from 'it-pipe'
import { fromString, toString } from 'uint8arrays'
import { webRTC } from '@libp2p/webrtc'

export default function PeerDiscovery() {

    const [currentNode, setCurrentNode] = useState(null);
    async function createNode() {
        const node = await createLibp2p({
            transports: [webRTC()],
            connectionEncryption: [noise()],
        });
        console.log(node.dial())

        setCurrentNode(node)
    }


    return (
        <>
            <div>PeerDiscovery</div>
            <button onClick={() => { createNode() }}>Create a Node</button>
            {currentNode && <p>{currentNode.peerId.publicKey}</p>}
            <button onClick={() => { currentNode.start() }}>Start A Node</button>



        </>
    )
}
