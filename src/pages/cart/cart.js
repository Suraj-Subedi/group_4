import {useContext} from "react";
import Navbar from "../../components/navbar/navbar";
import CartContext from "../../context/cartContext";
import ProductCard from "../../components/productCard";
import "./cart.css";
import {toast} from "react-hot-toast";

import {FiMinusCircle, FiPlusCircle} from "react-icons/fi";

function CartPage() {
  const {cart} = useContext(CartContext);
  return (
    <div>
      <Navbar />
      <span
        style={{justifyContent: "center", display: "flex", fontSize: "2rem"}}
      >
        Your Cart:
      </span>
      <div className="cartBox">
        {cart.map((item) => {
          return <CartCard cartItem={item} />;
        })}
      </div>
    </div>
  );
}

export default CartPage;

function CartCard({cartItem}) {
  const {product, quantity} = cartItem;
  const {cart, setCart} = useContext(CartContext);
  return (
    <div className="cartCard">
      <img
        src={"http://localhost/react_api/" + product.image_url}
        style={{width: "200px", height: "200px", objectFit: "cover"}}
      />
      <div className="infoBox">
        <p>{product.title}</p>
        <p>Rs. {product.price}</p>
      </div>
      <div className="btnBox">
        <FiMinusCircle
          onClick={() => {
            var newCart = cart;
            newCart.forEach((item) => {
              if (item.product.product_id === product.product_id) {
                if (item.quantity === 1) {
                  toast.error("Quantity cannot be less than 1");
                } else {
                  item.quantity = item.quantity - 1;
                  setCart([...newCart]);
                  localStorage.setItem("cart", JSON.stringify(newCart));
                  return;
                }
              }
            });
          }}
          size={30}
        />
        <span>{quantity}</span>
        <FiPlusCircle
          size={30}
          onClick={() => {
            var newCart = cart;
            newCart.forEach((item) => {
              if (item.product.product_id === product.product_id) {
                if (item.quantity === 10) {
                  toast.error("Quantity cannot be more than 10");
                } else {
                  item.quantity = item.quantity + 1;
                  setCart([...newCart]);
                  localStorage.setItem("cart", JSON.stringify(newCart));
                  return;
                }
              }
            });
          }}
        />
      </div>
    </div>
  );
}
