import { useState, useEffect } from 'react';

export default function RenderIfAuth(props) {

    const [isAuthenticated, setIsAuthenticated] = useState("Authenticating");
    
    function ifAuthenticatedSetStringTrue() {
        fetch('/api/session')
        .then(response => response.json())
        .then(data => data["isAuthenticated"])
        .then(result => result.toString())
        .then(stringResult => {
            setIsAuthenticated(stringResult);
            if (stringResult != "true") {
                window.location.href = "/login"
            } 
        })
        //.then(result => setIsAuthenticated(result))
    }

    useEffect(() => ifAuthenticatedSetStringTrue());

    return (
        <div className={isAuthenticated}>
            {isAuthenticated == "true" && <div>{props.element()}</div>}
        </div>
    )
}

export function obtainName(callBack) {
    fetch('/api/whoami')
    .then(response => response.json())
    .then(data => data.full_name)
    .then(result => callBack(result))
}