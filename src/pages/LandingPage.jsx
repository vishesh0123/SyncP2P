import React from 'react'
import './LandingPage.css';
import { Button, Container, Grid, Typography, Card, CardContent } from '@mui/material'
import ComputerIcon from '@mui/icons-material/Computer';
import { redirect } from 'react-router-dom';


export default function LandingPage() {

    return (
        <div className="landing-page">
            <div className="decentralization-animation">
                <div className="node-container top-left">
                    <div className="node">
                        <ComputerIcon />
                    </div>
                    <div className="data-packet4"></div>
                    <div className="data-packet4"></div>
                    <div className="data-packet1"></div>
                    <div className="data-packet1"></div>
                    <div className="data-packet4"></div>
                    <div className="data-packet4"></div>
                    <div className="data-packet1"></div>
                    <div className="data-packet1"></div>
                </div>
                <div className="node-container top-right">
                    <div className="node">
                        <ComputerIcon />
                    </div>
                    <div className="data-packet1"></div>
                    <div className="data-packet1"></div>
                    <div className="data-packet3"></div>
                    <div className="data-packet3"></div>
                    <div className="data-packet1"></div>
                    <div className="data-packet1"></div>
                    <div className="data-packet3"></div>
                    <div className="data-packet3"></div>
                </div>
                <div className="node-container bottom-left">
                    <div className="node">
                        <ComputerIcon />
                    </div>
                    <div className="data-packet2"></div>
                    <div className="data-packet2"></div>
                    <div className="data-packet4"></div>
                    <div className="data-packet4"></div>
                    <div className="data-packet2"></div>
                    <div className="data-packet2"></div>
                    <div className="data-packet4"></div>
                    <div className="data-packet4"></div>
                </div>
                <div className="node-container bottom-right">
                    <div className="node">
                        <ComputerIcon />
                    </div>
                    <div className="data-packet2"></div>
                    <div className="data-packet2"></div>
                    <div className="data-packet3"></div>
                    <div className="data-packet3"></div>
                    <div className="data-packet2"></div>
                    <div className="data-packet2"></div>
                    <div className="data-packet3"></div>
                    <div className="data-packet3"></div>
                </div>
                <div className="header">
                    <Typography variant="h1" className="logo">
                        SyncP2P
                    </Typography>
                    <Typography variant="h4" className="tagline">
                        Decentralizing Teamwork, Unleashing Potential for Seamless Collaboration
                    </Typography>
                </div>
                <div className="feature-section">
                    <div className="feature-card">

                        <div className="feature-details">
                            <h5 className="feature-title">Real-time Collaboration</h5>
                            <p className="feature-description">Enables real-time editing, allowing multiple users to collaborate on the same document simultaneously. Changes made by one user are instantly reflected for others, fostering seamless and efficient collaboration. With real-time editing, teams can work together in a synchronized environment, improving productivity and enabling faster decision-making.</p>
                        </div>
                    </div>
                    <div className="feature-card">

                        <div className="feature-details">
                            <h5 className="feature-title">Conflict Resolution & Merge</h5>
                            <p className="feature-description">Incorporates advanced conflict resolution mechanisms to handle conflicts that may arise when multiple users edit the same document simultaneously. It intelligently detects conflicts, such as overlapping changes or conflicting modifications, and provides intuitive tools to resolve them. By effectively managing conflicts, SyncP2P ensures that the final document is accurate, coherent, and reflective of all collaborators' contributions.</p>
                        </div>
                    </div>
                    <div className="feature-card">

                        <div className="feature-details">
                            <h5 className="feature-title">Version Control</h5>
                            <p className="feature-description">Keeps track of document history, allowing users to access and restore previous versions of the document. This feature provides a valuable safety net, enabling users to revert to earlier versions, review changes, and compare revisions. Versioning also facilitates auditing, tracking progress, and maintaining a comprehensive timeline of document evolution, enhancing accountability and facilitating effective collaboration.</p>
                        </div>
                    </div>
                </div>

                <Button onClick={() => { redirect('/syncp2p') }} variant="contained" color="secondary" size="large" className='hero-button' >
                    Get Started
                </Button>
            </div>
        </div>
    );
}
