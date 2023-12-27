import React, { useContext } from 'react'
import MyButton from './mybutton'
import CartContext from '../context/cartContext'
import { toast } from 'react-hot-toast'

function ProductCard({ product }) {
    const { cart, setCart } = useContext(CartContext)
    const [quantity, setQuantity] = React.useState(1)
    return (
        <div style={{
            display: "flex",
            flexWrap: "wrap",
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
                <div style={{ display: "flex", "gap": "10px" }}> <button onClick={() => {
                    setQuantity(quantity + 1)
                }}>+</button>
                    <h3>{quantity}</h3>
                    <button onClick={() => {
                        if (quantity === 1) {
                            toast.error("Quantity cannot be less than 1");
                            return;
                        }
                        setQuantity(quantity - 1)
                    }}>-</button></div>

                <MyButton title={"Add to Cart"} onClick={() => {

                    var alreadyInCart = false;
                    cart.forEach((item) => {
                        if (item.product_id === product.product_id) {
                            alreadyInCart = true;
                        }
                    })

                    if (alreadyInCart) {
                        toast.error("Product already in cart")
                    } else {

                        setCart([...cart, { product, quantity: quantity }])
                        localStorage.setItem("cart", JSON.stringify(cart))
                        toast.success("Product added to cart")

                    }

                }} />
            </div>
        </div>
    )
}

export default ProductCard