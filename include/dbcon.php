<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    $conn = new mysqli("localhost", "root", "", "crud_php");
    $conn->connect_error;
} catch (Exception $ex) {
    http_response_code(500);
    die();
}

$_GET = (filter_input_array(INPUT_GET, FILTER_SANITIZE_FULL_SPECIAL_CHARS));
$_POST = (filter_input_array(INPUT_POST, FILTER_SANITIZE_FULL_SPECIAL_CHARS));

?>