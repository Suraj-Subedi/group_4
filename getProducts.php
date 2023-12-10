<?php
include("./dbConfig.php");

$sql = "select products.*,category.title as category from products join category on products.category_id =category.category_id";

$result = mysqli_query($CON, $sql);

if ($result) {
    $products = [];
    while ($row = mysqli_fetch_assoc($result)) {
        array_push($products, $row);
    }
    echo json_encode([
        "success" => true,
        "products" => $products
    ]);
    die();
} else {
    echo json_encode([
        "success" => false,
        "message" => "Products fetch failed!"
    ]);
    die();
}
