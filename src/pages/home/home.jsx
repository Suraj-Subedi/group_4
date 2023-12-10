import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Navbar from '../../components/navbar/navbar';

function HomePage() {
    const navigate = useNavigate();

    const [count, setCount] = useState(1);
    const [photoUrl, setPhotoUrl] = useState("");




    useEffect(() => {
        console.log("get user details")
    }, [photoUrl]);

    return (
        <>
            {/* <div style={{ "fontSize": "10rem", "display": "flex", "justifyContent": "center", }}>{count}</div>
            <button onClick={() => {
                setCount(1)
            }}>Click me</button>
            <button onClick={() => {
                setPhotoUrl("https://picsum.photos/200/300")
            }}>Upload new Photo</button>
            <button onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
                toast.success("Logged out successfully")
            }}>Logout</button> */}
            <Navbar name={"suraj"} />
        </>
    )
}

export default HomePage