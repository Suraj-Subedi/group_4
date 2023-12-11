import React from 'react'
import MyButton from './mybutton'

function ProductCard({ product }) {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "85vh",
            gap: "1rem",
        }}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <img src={"http://localhost/react_api/" + product.image_url} style={{ "width": "200px", "height": "200px", "objectFit": "cover" }} />
                <h1>{product.title}</h1>
                <h5>{product.description}</h5>
                <h3>Rs. {product.price}</h3>
                <MyButton title={"Add to Cart"} onClick={() => {
                    // setCartNumber(cartNumber + 1)
                }} />
            </div>
        </div>
    )
}

export default ProductCard