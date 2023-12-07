import React, {
    useState

} from 'react'
import { Link } from 'react-router-dom';
import { ipAddress } from '../../constants';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const onSubmit = async (e) => {
        e.preventDefault();
        try {

            var formData = new FormData();
            formData.append("email", email);
            formData.append("name", name);
            formData.append("password", password);
            var response = await fetch("http://localhost/react_api/auth/register.php", {
                method: 'POST',
                body: formData,
            });

            var data = await response.json();

            if (data.success) {
                toast.success(data.message);
                navigate("/login");


            } else {
                toast.error(data.message);

            }

        } catch (error) {
            console.log(error)

        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div style={{ "display": 'flex', height: "100vh", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "25px" }}>

                <h1>Register your details</h1>
                <input value={name} onChange={(v) => setName(v.target.value)} required placeholder='Enter your name' type='text' className='input'></input>
                <input value={email} onChange={(v) => setEmail(v.target.value)} required placeholder='Enter your email' type='email' className='input'></input>
                <input value={password} onChange={(v) => setPassword(v.target.value)} required placeholder='Enter your password' type='password' className='input'></input>
                <button type='submit' className='button color bg-primary'>Register</button>
                <div style={{ "display": "flex", "gap": "10px" }}>
                    <span>Already have an account? </span>
                    <Link to={"/login"}>       <span href='/login' style={{ "color": "blue", "textDecoration": "underline", "cursor": "pointer" }} >Login</span></Link>

                </div>

            </div>
        </form>
    )
}

export default RegisterPage