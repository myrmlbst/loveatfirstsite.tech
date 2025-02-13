<?php
session_start(); // Start the session

if (isset($_GET['authid'])) {
    $authid = $_GET['authid'];

    if ($authid === "1234567890") { // Changed the value for obvious reasons
        $_SESSION['confirmed'] = true; // Create session variable
        header("Location: addlovers.php"); // Redirect to a specific page
        exit(); // Stop further execution
    } else {
        session_unset();  // Unset all session variables
        session_destroy(); // Destroy the session
       header("Location: /"); // Redirect if the condition is not met
        exit();
    }
} else {
     session_unset();  // Unset all session variables
    session_destroy(); // Destroy the session
    header("Location: /"); // Redirect if 'auttid' is not provided
    exit();
}
?>
