<?php
$host = "localhost";
$username = "root";
$password = "";
$db = "mgmarketing";
$conn = new mysqli($host, $username, $password, $db);
if (!$conn) {
    die("Did not connect");
}
// $conn->close();
// create database
