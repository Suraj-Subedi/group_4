import React from 'react'
import '../../App.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function LoginPage() {

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("onSubmit")
    }


    return (
        <form onSubmit={onSubmit}>
            <div style={{ "display": 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "25px" }}>

                <h1>Login</h1>
                <input required placeholder='Enter your email' type='email' className='input'></input>
                <input required placeholder='Enter your password' type='password' className='input'></input>
                {/* <button type='submit' className='button'>Login</button> */}
                <Button className='button'>Login</Button>
                <div style={{ "display": "flex", "gap": "10px" }}>
                    <span>Don't have an account? </span>
                    <Link to={"/register"}>
                        <a style={{ "color": "blue", "textDecoration": "underline", "cursor": "pointer" }} >Register</a>
                    </Link>
                </div>

            </div>
        </form>
    )
}

export default LoginPage