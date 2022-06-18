<?php
include 'config.php';
include 'add-image.php';


if (isset($_POST['add-member'])) {
    $member_name = mysqli_real_escape_string($conn, $_POST['team_name']);
    $member_position = mysqli_real_escape_string($conn, $_POST['team_position']);
    $facebook_link = mysqli_real_escape_string($conn, $_POST['facebook_link']);
    $instagram = mysqli_real_escape_string($conn, $_POST['instagram']);
    $profileImage = $_FILES['profile_image'];
    addToTeam($name, $position, $profileImage, $facebook, $instagram);
}

function addToTeam($name, $position, $profileImage, $facebook, $instagram)
{
    $target_dir = '../img/teamimages/';
    global $conn;
    $name=htmlspecialchars($name);
    $position = mysqli_real_escape_string($conn, $position);
    $facebook = mysqli_real_escape_string($conn, $facebook);
    $instagram = mysqli_real_escape_string($conn, $instagram);

    $image = addImage($target_dir, $profileImage);
    print_r($image);

    //     $sql = "INSERT INTO team (name, image, position)
    //     VALUES (
    //     htmlspecialchars($membername),
    //     htmlspecialchars($image),
    //     htmlspecialchars($position),
    //     htmlspecialchars($facebook),
    //     htmlspecialchars($instagram),
    // )";

    // if (mysqli_query($conn, $sql)) {
    //     echo "New record created successfully";
    // } else {
    //     echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    // }
}
