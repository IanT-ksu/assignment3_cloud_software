<?php
session_start();
include 'connectDB.php';

$username = $_POST['username'];
$password = $_POST['password'];

$sqlquery = "SELECT username, password
FROM user_accounts WHERE username = ?";

$params = array($username);
$stmt = sqlsrv_query($conn, $sqlquery, $params);

if ($stmt && $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)){
    if ($password === $row['password']){
        $_SESSION['username'] = $username;
        
        header('Content-Type: application/json');
        echo json_encode([
            "username" => $username,
            "is_logged_in" => true,
            "message" => "Login successful.",
            "new_url" => "home.html"
        ]);
        exit();
    } else {
        header('Content-Type: application/json');
        echo json_encode([
            "message" => "Invalid password.",
            "is_logged_in" => false
        ]);
        exit();
    }
}
else{
    echo "User not found.";
}

?>