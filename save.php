<?php

session_start(); // Start the session

if (!isset($_SESSION['confirmed']) || $_SESSION['confirmed'] !== true) {
    header("Location: /"); // Redirect if not confirmed
    exit();
}

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$data = file_get_contents('php://input');

if ($data) {
    file_put_contents('lovers.json', $data);
    echo json_encode(["message" => "Data saved successfully"]);
} else {
    echo json_encode(["error" => "No data received"]);
}
