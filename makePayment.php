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


if (isset($_POST['amount'], $_POST['orderId'], $_POST['status'], $_POST['otherDetails'])) {
    $amount = $_POST['amount'];
    $orderId = $_POST['orderId'];
    $status = $_POST['status'];
    $otherDetails = $_POST['otherDetails'];


    $sql = "insert into payments (user_id,amount,order_id,status,other_details) values ('$userId','$amount','$orderId','$status','$otherDetails')";

    $result = mysqli_query($CON, $sql);

    if ($result) {
        $sql = "update orders set status = '$status' where order_id = '$orderId'";
        $result = mysqli_query($CON, $sql);
        if ($result) {
            echo json_encode([
                "success" => true,
                "message" => "Payment successful!",
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => "Payment failed!"
            ]);
        }
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Payment failed!"
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "amount,orderId,status,otherDetails not found!"
    ]);
}
