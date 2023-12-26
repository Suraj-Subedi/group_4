import {useContext, useEffect} from "react";
import Navbar from "../../components/navbar/navbar";
import CartContext from "../../context/cartContext";
import ProductCard from "../../components/productCard";
import "./cart.css";
import {toast} from "react-hot-toast";
import {useState} from "react";

import {FiMinusCircle, FiPlusCircle} from "react-icons/fi";

function CartPage() {
  const {cart} = useContext(CartContext);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    var total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    setTotal(total);
  }, [cart]);

  return (
    <div>
      <Navbar />
      <div style={{display: "flex", justifyContent: "space-evenly"}}>
        <div>
          {" "}
          <span
            style={{
              justifyContent: "",
              display: "flex",
              fontSize: "2rem",
              padding: "10px",
            }}
          >
            Your Cart:
          </span>
          <div className="cartBox">
            {cart.map((item) => {
              return <CartCard cartItem={item} />;
            })}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "10px 10px",
            fontSize: "1.25rem",
          }}
        >
          <div>
            {" "}
            <span>Order Summary:</span>
            <span>Total:Rs.{total}</span>
          </div>
        </div>
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
