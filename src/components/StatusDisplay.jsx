import React, { useEffect, useState } from 'react'
import './StatusDisplay.css'

export default function StatusDisplay({ queue }) {
    useEffect(() => {

    }, [queue])


    return (
        <div>
            {queue.map((status) => {
                return <p className='statusText'>{status}</p>
            })}
        </div>
    )
}
