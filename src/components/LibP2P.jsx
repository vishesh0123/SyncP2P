import React from 'react'
import { createLibp2p } from 'libp2p'
import { noise } from '@chainsafe/libp2p-noise'
import { webRTC } from '@libp2p/webrtc'
import { multiaddr } from '@multiformats/multiaddr'

export default function LibP2P() {

    const createNode = async () => {
        const node = await createLibp2p({
            transports: [webRTC()],
            connectionEncryption: [noise()],
        });
        // const node1 = await createLibp2p({
        //     transports: [webRTC()],
        //     connectionEncryption: [noise()],
        // });
        console.log(node)
        const ma = multiaddr('/ip4/106.195.9.107/udp/62984/webrtc/p2p-circuit/p2p/12D3KooWJ64v1rhBArZJh5X436kXY4Lhc1PChkQseRyYLZhmRcZP');
        await node.start()
        const stream = await node.dialProtocol(ma, ['/my-protocol/1.0.0'])
        console.log(stream)

    }
    return (
        <>
            <h1>LIBP2P TEST</h1>
            <br />
            <button onClick={() => { createNode() }}>Create Libp2p node</button>
        </>
    )
}
