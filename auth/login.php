<?php

//check if email and password is received

if (!isset($_POST['email'], $_POST['password'])) {
    echo json_encode(
        [
            "success" => false,
            "message" => "email,and password is required!"
        ]
    );
    die();
}

include("../dbConfig.php");

$email = $_POST['email'];
$password = $_POST['password'];

//check if email is valid

$sql = "select * from users where email='$email'";

global $CON;

$result = mysqli_query($CON, $sql);

$count = mysqli_num_rows($result);



if ($count == 0) {
    echo json_encode(
        [
            "success" => false,
            "message" => "User not found!"
        ]
    );
    die();
}

//check if password is correct

$user = mysqli_fetch_assoc($result);
$hased_password = $user['password'];
$user_id = $user['user_id'];

$is_password_correct = password_verify($password, $hased_password);

if (!$is_password_correct) {
    echo json_encode(
        [
            "success" => false,
            "message" => "Password is incorrect!"
        ]
    );
    die();
}

//generate token and save it in database
$token = bin2hex(random_bytes(16));


$sql = "insert into personal_access_token (token,user_id) values ('$token','$user_id')";

$result = mysqli_query($CON, $sql);

if (!$result) {
    echo json_encode(
        [
            "success" => false,
            "message" => "Something went wrong!"
        ]
    );
    die();
}

//send token to client

echo json_encode(
    [
        "success" => true,
        "message" => "Login successful!",
        "token" => $token
    ]
);
