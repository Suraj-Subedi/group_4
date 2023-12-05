import React, { useEffect, useState } from 'react'

function HomePage() {

    const [count, setCount] = useState(1);
    const [photoUrl, setPhotoUrl] = useState("");




    useEffect(() => {
        console.log("get user details")
    }, [photoUrl]);

    return (
        <>
            <div style={{ "fontSize": "10rem", "display": "flex", "justifyContent": "center", }}>{count}</div>
            <button onClick={() => {
                setCount(1)
            }}>Click me</button>
            <button onClick={() => {
                setPhotoUrl("https://picsum.photos/200/300")
            }}>Upload new Photo</button>
        </>
    )
}

export default HomePage