import React from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

export default class LoginPage extends React.Component {
    render() {
        return (
            <>
            <LoginForm />
            </>
        );
    }
}

function LoginForm() {
    const { handleSubmit, register} = useForm();
    const onError = (errors, e) => console.log(errors, e);
    function onSubmit(data, e) {
        fetch(
            '/api/login/', 
            { method: 'POST',
              body: JSON.stringify(data),
              headers: {'Content-Type': 'application/json',
                        'X-CSRFToken': Cookies.get("csrftoken"),}}).then(response => {if (response.redirected) {
                            window.location.href = response.url;
                        }})
    }
    return (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
            <label htmlFor="username">Username</label>
            <input id="username" {...register('username', { required: true, maxLength: 30 })} />
            <br></br>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" {...register('password', { required: true, maxLength: 30 })} />
            <br></br>
            <input type="hidden" name="csrfmiddlewaretoken" value={Cookies.get("csrftoken")} /> 
            <input type="submit" />
        </form>
    );
}