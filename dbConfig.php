<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');

$HOST = 'localhost';
$USER = 'root';
$PASS = '';
$DB = 'react_class';

$CON = mysqli_connect($HOST, $USER, $PASS, $DB);

if (!$CON) {
    echo "Connection failed";
}
