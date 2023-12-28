import React, {useContext, useState} from "react";
import "./navbar.css";
import {FaCartShopping} from "react-icons/fa6";
import {MdLogout} from "react-icons/md";
import MyButton from "../mybutton";
import CartContext from "../../context/cartContext";
import {Link} from "react-router-dom";
import {MdAddBox} from "react-icons/md";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {toast} from "react-hot-toast";
import CartPage from "../../pages/cart/cart";
function Navbar({fetchProducts}) {
  const {cart} = useContext(CartContext);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState();

  const handleClose = () => {
    setShowAddModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      var formData = new FormData();
      formData.append("title", name);
      formData.append("description", description);
      formData.append("category_id", category_id);
      formData.append("price", price);
      formData.append("image", image);
      var response = await fetch("http://localhost/react_api/addProduct.php", {
        method: "POST",
        body: formData,
      });

      var data = await response.json();

      if (data.success) {
        toast.success(data.message);
        fetchProducts();
        handleClose();
        // window.location.reload();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(name);
  return (
    <div className="fixed-top">
      <Modal
        className="test"
        show={showLogoutModal}
        onHide={() => {
          setShowLogoutModal(false);
        }}
        fullscreen={"xl-down"}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <CartPage /> */}
          <p>Are you sure you want to logout?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            variant="secondary"
          >
            Logout
          </Button>

          <Button
            onClick={() => {
              setShowLogoutModal(false);
            }}
            variant="primary"
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showAddModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div></div>
            <input
              value={name}
              onChange={(v) => {
                setName(v.target.value);
              }}
              required
              placeholder="Enter Product Name"
              type="text"
              className="input"
            ></input>
            <input
              value={description}
              onChange={(v) => {
                setDescription(v.target.value);
              }}
              required
              placeholder="Enter Product Description"
              type="text"
              className="input"
            ></input>
            <input
              value={category_id}
              onChange={(v) => {
                setCategory_id(v.target.value);
              }}
              required
              placeholder="Enter Category ID"
              type="number"
              className="input"
            ></input>
            <input
              value={price}
              onChange={(v) => {
                setPrice(v.target.value);
              }}
              required
              placeholder="Enter Product Price"
              type="number"
              className="input"
            ></input>
            <input
              onChange={(v) => {
                setImage(v.target.files[0]);
              }}
              type="file"
              className="input"
            ></input>
            <br></br>
            <Button onClick={handleClose} variant="secondary">
              Close
            </Button>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </form>
        </Modal.Body>
      </Modal>

      <div className="navHead bg-primary">
        <Link to={"/home"} style={{color: "white", textDecoration: "none"}}>
          <p className="logo"> Mero Dokan</p>
        </Link>

        <div className="catHead">
          <span className="cat">Men</span>
          <span className="cat">Woman</span>
          <span className="cat">Kids</span>
        </div>
        <div className="iconHead">
          <div style={{display: "flex", gap: "15px"}}>
            <div
              onClick={() => {
                setShowAddModal(true);
              }}
            >
              {" "}
              <MdAddBox size={22} />
              <span>Add Product</span>
            </div>
            <Link
              to="/cart"
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              <div>
                {" "}
                <FaCartShopping size={22} />
                <span className="cartCount">{cart.length}</span>
              </div>
            </Link>
          </div>

          <MdLogout
            size={22}
            onClick={() => {
              setShowLogoutModal(true);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
