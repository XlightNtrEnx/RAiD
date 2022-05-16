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
    const { register, formState: { errors } } = useForm();

    return (
        <form action="/api/auth/login/" method="post">
            <label htmlFor="username">Username</label>
            <input id="username" {...register('username', { required: true, maxLength: 30 })} />
            {errors.name && errors.name.type === "required" && <span>This is required</span>}
            {errors.name && errors.name.type === "maxLength" && <span>Max length exceeded</span> }
            <br></br>
            <label htmlFor="password">Password</label>
            <input id="password" {...register('password', { required: true, maxLength: 30 })} />
            {errors.name && errors.name.type === "required" && <span>This is required</span>}
            {errors.name && errors.name.type === "maxLength" && <span>Max length exceeded</span> }
            <input type="hidden" name="csrfmiddlewaretoken" value={Cookies.get("csrftoken")} /> 
            <input type="submit" />
        </form>
    );
}