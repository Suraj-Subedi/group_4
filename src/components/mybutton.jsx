import React from 'react'

function MyButton({ title, onClick, style }) {
    return (
        <button onClick={onClick} style={style} className='button bg-primary'>{title}</button>
    )
}

export default MyButton