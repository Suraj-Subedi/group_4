import React, { useState } from 'react'

function HomePage() {
    const [count, setCount] = useState(1);

    return (
        <>
            <div style={{ "fontSize": "10rem", "display": "flex", "justifyContent": "center", }}>{count}</div>
            <button onClick={() => {
                setCount(count + 1)
            }}>Click me</button>
        </>
    )
}

export default HomePage