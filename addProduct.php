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
$isAdmin = isAdmin($token);

if (!$isAdmin) {
    echo json_encode([
        "success" => false,
        "message" => "You are not authorized to perform this action!"
    ]);
    die();
}




if (isset(
    $_POST['title'],
    $_POST['price'],
    $_POST['description'],
    $_POST['category_id'],
    $_FILES['image']
)) {
    $title = $_POST['title'];
    $price = $_POST['price'];
    $description = $_POST['description'];
    $category_id = $_POST['category_id'];
    $image = $_FILES['image'];

    $image_name = $image['name'];
    $image_tmp_name = $image['tmp_name'];
    $image_size = $image['size'];
    $image_error = $image['error'];

    $image_extension = pathinfo($image_name, PATHINFO_EXTENSION);
    $image_extension = strtolower($image_extension);

    $allowed_extensions = ['jpg', 'jpeg', 'png', 'webp'];

    if (!in_array($image_extension, $allowed_extensions)) {
        echo json_encode([
            "success" => false,
            "message" => "Image extension is not allowed!"
        ]);
        die();
    }

    if ($image_error != 0) {
        echo json_encode([
            "success" => false,
            "message" => "Image upload failed!"
        ]);
        die();
    }

    if ($image_size > 5 * 1024 * 1024) {
        echo json_encode([
            "success" => false,
            "message" => "Image size is too large!"
        ]);
        die();
    }

    $new_image_name = uniqid() . "." . $image_extension;

    $destination = "./uploads/" . $new_image_name;

    $is_moved = move_uploaded_file($image_tmp_name, $destination);

    if (!$is_moved) {
        echo json_encode([
            "success" => false,
            "message" => "Image upload failed!"
        ]);
        die();
    }

    $sql = "insert into products (title,price,description,category_id,image_url) values ('$title','$price','$description','$category_id','uploads/$new_image_name')";

    global $CON;

    $result = mysqli_query($CON, $sql);

    if ($result) {
        echo json_encode([
            "success" => true,
            "message" => "Product added successfully!"
        ]);
        die();
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Product add failed!"
        ]);
        die();
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "title,price,description,category_id,image are required!"
    ]);
    die();
}
