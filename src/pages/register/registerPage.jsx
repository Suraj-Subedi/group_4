import React from 'react'
import { Link } from 'react-router-dom';

function RegisterPage() {
    const onSubmit = (e) => {
        e.preventDefault();
        console.log("onSubmit")
    }

    return (
        <form onSubmit={onSubmit}>
            <div style={{ "display": 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "25px" }}>

                <h1>Register your details</h1>
                <input required placeholder='Enter your name' type='text' className='input'></input>
                <input required placeholder='Enter your email' type='email' className='input'></input>
                <input required placeholder='Enter your password' type='password' className='input'></input>
                <button type='submit' className='button color bg-primary'>Register</button>
                <div style={{ "display": "flex", "gap": "10px" }}>
                    <span>Already have an account? </span>
                    <Link to={"/login"}>       <a style={{ "color": "blue", "textDecoration": "underline", "cursor": "pointer" }} >Login</a></Link>

                </div>

            </div>
        </form>
    )
}

export default RegisterPage