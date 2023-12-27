import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Navbar from '../../components/navbar/navbar';
import MyButton from '../../components/mybutton';
import ProductCard from '../../components/productCard';

function HomePage() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [cartNumber, setCartNumber] = useState(0);

    const [count, setCount] = useState(0);
    const [photoUrl, setPhotoUrl] = useState("");


    const fetchProducts = async () => {
        var response = await fetch('http://localhost/react_api/getProducts.php', {
            method: 'GET',

        });
        var data = await response.json();
        if (data.success) {
            setProducts(data.products);
        } else {
            toast.error(data.message);
        }
    }

    useEffect(() => {

        fetchProducts();


    }, []);








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
            <Navbar fetchProducts={fetchProducts} />
            {/* <center style={{

            }}> */}
            {/* <button onClick={() => {
                    setCartNumber(cartNumber + 1)
                }} className='bg-primary mt-5'>Add to Cart</button> */}
            {/* <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "85vh",
                    gap: "1rem",
                }}> */}
            {/* <MyButton title={"First Button"} style={{ "background-color": "blue" }} />
                    <MyButton title={"SEcond button"} />
                    <MyButton title={"Thrird Button"} /> */}
            {/* </div>
            </center> */}

            <div style={{

                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "1rem",
                padding: "1rem",
                paddingTop: "100px",

            }}>
                {
                    products.map((product) => {
                        return (
                            <ProductCard product={product} />

                        )
                    })
                }
            </div>



        </>
    )
}

export default HomePage