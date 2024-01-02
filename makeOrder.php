<?php

include("./dbConfig.php");
include "./helpers/authHelper.php";


if (!isset($_POST['token'])) {
    echo json_encode([
        "success" => false,
        "message" => "Token not found!"
    ]);
    die();
}

$token = $_POST['token'];
$userId = getUserId($token);


if (isset($_POST['total'], $_POST['cart'])) {

    $cart = $_POST['cart'];
    $total = $_POST['total'];

    $sql = "insert into orders (user_id,total,status) values ('$userId','$total','pending')";


    global $CON;
    $result = mysqli_query($CON, $sql);

    if ($result) {
        $orderId = mysqli_insert_id($CON);

        $decodedCart = json_decode($cart);


        if (count($decodedCart) == 0) {
            echo json_encode([
                "success" => false,
                "message" => "Cart is empty!"
            ]);
            die();
        }

        $result;

        foreach ($decodedCart as $cartItem) {
            $product_id = $cartItem->product->product_id;
            $quantity = $cartItem->quantity;

            $sql = "insert into order_details (order_id,product_id,quantity) values ('$orderId','$product_id','$quantity')";

            $result = mysqli_query($CON, $sql);
        }

        if ($result) {
            echo json_encode([
                "success" => true,
                "message" => "Order successful!",
                "orderId" => $orderId
            ]);
            die();
        } else {
            echo json_encode([
                "success" => false,
                "message" => "Order failed!"
            ]);
            die();
        }
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Order failed!"
        ]);
        die();
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "total and cart is required!"
    ]);
    die();
}
