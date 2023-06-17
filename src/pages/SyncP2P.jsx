import React, { useEffect, useState } from 'react'
import { useAuth, useIsAuthenticated } from "@polybase/react";
import './SyncP2P.css'
import '../index.css';
import StatusDisplay from '../components/StatusDisplay';
import { Button, Typography } from '@mui/material';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import FileUpload from '../components/FileUpload';




export default function SyncP2P() {
    const [statusQueue, setStatusQueue] = useState([])
    const { auth, state } = useAuth();
    const [isLoggedIn, loading] = useIsAuthenticated();

    // const addHi = () => {
    //     setStatusQueue([...statusQueue, 'Hi , Welcome to SyncP2P !....']);
    // }

    useEffect(() => {
        auth.onAuthUpdate((authstate) => {
            console.log(authstate)
            if (authstate) {
                //userLoggedIn
                setStatusQueue([...statusQueue, `Connected to wallet . publicKey: ${authstate.publicKey}`])
            } else {

            }
        })

    }, [])
    return (
        <>
            <div className='syncp2p'>
                <div className='status'>
                    <StatusDisplay queue={statusQueue} />
                </div>
                <div className='connectbox'>
                    {!isLoggedIn ? (<Button onClick={() => { auth.signIn() }} className='connectbutton'>
                        <LockPersonIcon className='connecticon' />&nbsp;
                        Authenticate With Wallet
                    </Button>) : (<FileUpload queue={statusQueue} set={setStatusQueue} />)}

                </div>
            </div>

        </>
    )
}
