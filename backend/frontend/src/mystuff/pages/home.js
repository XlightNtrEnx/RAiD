import React, { useEffect, useState } from 'react';
import { Link, Outlet } from "react-router-dom";
import RenderIfAuth, { obtainName } from '../authentication/authentication.js'; 

export default function HomePage() {
    const [fullName, setFullName] = useState("");
    useEffect(() => obtainName(setFullName));
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
                <Link to="/api/logout" reloadDocument={true}>Logout</Link> |{" "}
                <h1>Hello {fullName}</h1>
            </nav>
            <Outlet>
                <h1>Welcome to 508 SQN!</h1>
            </Outlet>
            </div>
        )
    }

    return (
        <RenderIfAuth element={LayOut}>
        </RenderIfAuth>
    );
}


