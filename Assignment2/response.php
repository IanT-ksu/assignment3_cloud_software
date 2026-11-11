<?php
header('Content-Type: application/json');

require_once('connectDB.php');

$username = "user";
$message = $_POST["message"]; 
$flower = $_POST["flower"];

$insertsql = "INSERT INTO response_data (flower_name, user_message) 
VALUES (?,?)";

$params = array($flower, $message);

sqlsrv_query($conn, $insertsql, $params);


$querysql = "SELECT flower_name, COUNT(*) 
AS Total FROM response_data GROUP BY flower_name";

$stmt = sqlsrv_query($conn, $querysql);

$count = [];

while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    $count[$row['flower_name']] = $row['Total'];
}

    echo json_encode([
        "message" => $message,
        "flower" => $flower,
        "count" => $count,
        "response" => "Hello {$username}, you have planted {$flower}s in the garden. 
        \nYou also sent the message: \"{$message}\""
    ]);

    sqlsrv_close($conn);
?>