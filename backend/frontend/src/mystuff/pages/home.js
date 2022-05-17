import { experimentalStyled, paperClasses } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link, Outlet, NavLink, Navigate } from "react-router-dom";

export default function HomePage() {

    function LayOut(props) {
        return (
            <div className='Home'>
            <nav
            style={{
            borderBottom: "solid 1px",
            paddingBottom: "1rem",
            }} >
                <Link to="/keypress">Keypress</Link> |{" "}
                <Link to="/opslog">Opslog</Link> |{" "}
                <Link to="/api/logout" reloadDocument={true}>Logout</Link> |
            </nav>
            <Outlet>
                <h1>Welcome to 508 SQN!</h1>
            </Outlet>
            </div>
        )
    }
    
    function RenderIfAuth(props) {

        const [isAuthenticated, setIsAuthenticated] = useState("Authenticating");
        
        function ifAuthenticatedSetStringTrue() {
            fetch('/api/session')
            .then(response => response.json())
            .then(data => data["isAuthenticated"])
            .then(result => result.toString())
            .then(stringResult => setIsAuthenticated(stringResult))
            //.then(result => setIsAuthenticated(result))
        }

        useEffect(() => ifAuthenticatedSetStringTrue());

        return (
            <div className={isAuthenticated}>
                {isAuthenticated == "true" && <div>{props.element()}</div>}
            </div>
        )
    }

    return (
        <RenderIfAuth element={LayOut}>
        </RenderIfAuth>
    );
}


