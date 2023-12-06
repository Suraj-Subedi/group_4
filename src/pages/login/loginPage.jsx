import React from 'react'
import '../../App.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const onSubmit = async (e) => {

        e.preventDefault();
        try {

            var formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);
            var response = await fetch('http://localhost/react_api/auth/login.php', {
                method: 'POST',
                body: formData,
            });

            console.log(response.body);

        } catch (error) {
            console.log(error)

        }
    }


    return (
        <form onSubmit={onSubmit}>
            <div style={{ "display": 'flex', height: "100vh", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "25px" }}>

                <h1>Login</h1>
                <input onChange={(v) => { setEmail(v.target.value) }} required value={email} placeholder='Enter your email' type='email' className='input'></input>
                <input onChange={(v) => { setPassword(v.target.value) }} value={password} required placeholder='Enter your password' type='password' className='input'></input>
                {/* <button type='submit' className='button'>Login</button> */}
                <Button type='submit' className='button'>Login</Button>
                <div style={{ "display": "flex", "gap": "10px" }}>
                    <span>Don't have an account? </span>
                    <Link to={"/register"}>
                        <span style={{ "color": "blue", "textDecoration": "underline", "cursor": "pointer" }} >Register</span>
                    </Link>
                </div>

            </div>
        </form>
    )
}

export default LoginPage