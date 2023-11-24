<?php

//email, name and password check

if (!isset(
    $_POST['email'],
    $_POST['name'],
    $_POST['password']
)) {

    echo json_encode(
        [
            "success" => false,
            "message" => "email, name and password is required!"
        ]
    );
    die();
}

//check if email is already registered

include("./dbConfig.php");

$email = $_POST['email'];
$name = $_POST['name'];
$password = $_POST['password'];

$sql = "select * from users where email ='$email'";

global $CON;

$result = mysqli_query($CON, $sql);

$count = mysqli_num_rows($result);

if ($count > 0) {
    echo json_encode(
        [
            "success" => false,
            "message" => "Email already exists!"
        ]
    );
    die();
}

//encrypt the password

$encrypted_password = password_hash($password, PASSWORD_DEFAULT);

//save data to db 

$sql = "insert into users (name, email, password,role) values ('$name','$email','$encrypted_password','user')";

$result = mysqli_query($CON, $sql);

if ($result) {
    echo json_encode(
        [
            "success" => true,
            "message" => "Registration successful!"
        ]
    );
} else {
    echo json_encode(
        [
            "success" => false,
            "message" => "Registration failed!"
        ]
    );
}
