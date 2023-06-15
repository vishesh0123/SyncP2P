import React, { useEffect, useState } from 'react'
import { Web3Storage } from 'web3.storage'
import { ethers } from "ethers";


export default function UploadFile() {
    const [files, setFiles] = useState([])
    const [cid, setCid] = useState('')
    const [Sync, setSync] = useState(undefined)

    useEffect(() => {
        window.ethereum.on('chainChanged', () => { connectWallet() });
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner()
        const sync = new ethers.Contract('0xD75c18B373D891f6076A102A2FFf5350AD799aBE', daiAbi, signer);
        setSync(sync);
        sync.on('register', (registerar, cid, event) => {
            console.log(registerar);
            console.log(cid)
            console.log(event)
        })
        console.log('Event Subscribed')
        return () => {
            sync.off('register', (registerar, cid, event) => {
                console.log(registerar);
                console.log(cid)
                console.log(event)
            });
        };
    }, [])



    const daiAbi = [
        // Some details about the token
        "function Register(string calldata cid)",
        "function Invite(address peer)",
        "function declineInvite(address registearar)",
        "function acceptInvite(address registerar, string calldata sdpCid)",
        "function shareSDP(address to,string calldata cid)",
        "function negotiationNeeded(address to , string calldata sdpCid)",
        "function getLatestSDP(address from , address to) view returns(string memory)",
        "event register(address indexed registerar, string cid)"
    ];

    const getFiles = () => {
        const fileInput = document.getElementById('fileInput');
        console.log(fileInput.files[0])
        const reader = new FileReader()
        reader.onload = function (e) {
            const contents = e.target.result;
            document.getElementById('uploadedFile').value = contents;
        };
        reader.readAsText(fileInput.files[0]);
        setFiles([...files, fileInput.files[0]])

    }

    const storeFiles = async () => {
        const client = new Web3Storage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGFGNTY0RUM4QmVjOWMxMzg3MWY2MUEzQjlhOUY5YjVlQ2FDMjE4RTUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODY1NTEyMjYzOTksIm5hbWUiOiJzeW5jUDJQIn0.iV4sWngaR7vnK5RfWmrSAtkX-58syzNjls7bExSjCHQ' })
        const cid = await client.put(files);
        document.getElementById('cid').innerText = `CID OF STORED FILE: ${cid}`
        setCid(cid);
    }

    const connectWallet = async () => {

        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        if (parseInt(chainId) === 314159) {
            document.getElementById('metamask').innerText = `Connected to Calibration ${parseInt(chainId)}`
        } else {
            document.getElementById('metamask').innerText = `Connected to Wrong chain , Switch to Calibration Testnet`
        }


    }

    const invitePeers = async (e) => {
        e.preventDefault();


        await Sync.Register(cid);

    }
    return (
        <>
            <button onClick={() => { connectWallet() }}>Connect Calibration Testnet</button>
            <p id='metamask'>Not Connected</p>
            <br />
            <br />
            <div style={{ 'display': 'flex' }}>
                <input type="file" accept=".txt" id="fileInput" name="fileInput"></input>
                <button onClick={() => { getFiles() }}>Show Text</button>
                <textarea style={{ 'height': '200px', 'width': '350px' }} id='uploadedFile'></textarea>
            </div>
            <br />
            <button onClick={() => { storeFiles() }}>Store Files in Filecoin</button>
            <p id='cid'>CID OF STORED FILE: File Not Uploaded Yet</p>
            <br />
            <form onSubmit={(e) => { invitePeers(e) }}>
                <input type='text'></input>&nbsp;&nbsp;&nbsp;&nbsp;
                <button type='submit'>ENTER PUBLIC KEY TO INVITE </button>
            </form>

        </>
    )
}
