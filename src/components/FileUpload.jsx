import React from 'react'
import "./FileUpload.css"
import { Typography } from '@mui/material'

export default function FileUpload({ queue, set }) {

    return (
        <div className='filebox'>
            <Typography className='filetext'>Upload Text File</Typography>&nbsp;
            <input onChange={() => { set([...queue, 'File Uploaded']) }} type="file" accept=".txt" id="fileInput" name="fileInput"></input>

        </div>
    )
}
