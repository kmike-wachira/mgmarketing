<?php
include 'config.php';


if (isset($_POST['add-member'])) {
    $member_name = mysqli_real_escape_string($conn, $_POST['team_name']);
    $member_position = mysqli_real_escape_string($conn, $_POST['team_position']);
    $facebook_link = mysqli_real_escape_string($conn, $_POST['facebook_link']);
    $instagram = mysqli_real_escape_string($conn, $_POST['instagram']);
    $profileImage = $_FILES['profile_image']['tmp_name'];
}
function addToTeam($name, $position, $imagename, $facebook, $instagram)
{
    global $conn;
    $filename = mysqli_real_escape_string($conn, $name);
    $image = mysqli_real_escape_string($conn, $imagename);
    $position = mysqli_real_escape_string($conn, $position);
    $facebook = mysqli_real_escape_string($conn, $facebook);
    $instagram = mysqli_real_escape_string($conn, $instagram);
    $sql = "INSERT INTO team (name, image, position)
    VALUES (
    htmlspecialchars($name),
    htmlspecialchars($image),
    htmlspecialchars($position),
    htmlspecialchars($facebook),
    htmlspecialchars($instagram),
)";

    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
}
