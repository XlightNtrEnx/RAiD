import React from 'react';
import { Link, Outlet, NavLink, Navigate } from "react-router-dom";

export default function HomePage() {
    
    ifUnauthenticatedRedirect();

    return (
        <div className='Home'>
        <nav
        style={{
        borderBottom: "solid 1px",
        paddingBottom: "1rem",
        }} >
        <Link to="/keypress">Keypress</Link> |{" "}
        <Link to="/opslog">Opslog</Link> |{" "}
        <Link to="/api/auth/logout" reloadDocument={true}>Logout</Link> |
        </nav>
        <Outlet>
            <h1>Welcome to 508 SQN!</h1>
        </Outlet>
        </div>
    );
}

function ifUnauthenticatedRedirect() {

    function retrieveAllOpslogRecords() {
        return fetch('/api/opslogrecords').then(response => response.json())
    }

    function navigateIfUnsuccessful(data) {
        if (data['detail'] == "Authentication credentials were not provided.") {
            window.location.assign("/api/auth/login");
        }
    }
    
    retrieveAllOpslogRecords().then(data => navigateIfUnsuccessful(data));
}

