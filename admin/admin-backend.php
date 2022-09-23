<?php
include 'config.php';
include 'add-image.php';


if (isset($_POST['add-member'])) {
    $target_dir = '../img/teamimages/';
    $member_name = mysqli_real_escape_string($conn, $_POST['team_name']);
    $member_position = mysqli_real_escape_string($conn, $_POST['team_position']);
    $facebook_link = mysqli_real_escape_string($conn, $_POST['facebook_link']);
    $instagram = mysqli_real_escape_string($conn, $_POST['instagram']);
    $profileImage = $_FILES['profile_image'];
    $image = addImage($target_dir, $profileImage);
    if ($image['uploaded'] == 1) {
        $create_team = addToTeam($member_name, $member_position, $image['image_name'], $facebook_link, $instagram);
        if ($create_team['status'] == 1) {
            return header('location:add-to-team.php');
        } else {
            $create_team['message'];
        }
    } else {
        echo $image['message'];
    }
}

function addToTeam($name, $position, $profile_image, $facebook, $instagram)
{
    global $conn;
    $name = htmlspecialchars($name);
    $position = mysqli_real_escape_string($conn, $position);
    $facebook = mysqli_real_escape_string($conn, $facebook);
    $instagram = mysqli_real_escape_string($conn, $instagram);
    $sql = "INSERT INTO `users`( `name`, `position`, `profile_image`, `facebook`, `instagram`)
        VALUES ('$name','$position','$profile_image','$facebook','$instagram')";

    if (mysqli_query($conn, $sql)) {
        return ['status' => true, 'message' => 'new member created'];
    } else {
        return ['status' => false, 'message' => $conn->error];
    }
}

// add client
if (isset($_POST['add-client'])) {
    $target_dir = '../img/clients/';
    $client_name = mysqli_real_escape_string($conn, $_POST['client_name']);
    $facebook_link = mysqli_real_escape_string($conn, $_POST['facebook_link']);
    $instagram_link = mysqli_real_escape_string($conn, $_POST['instagram_link']);
    $profileImage = $_FILES['client_image'];
    $image = addImage($target_dir, $profileImage);
    if ($image['uploaded'] == 1) {
        $create_client = addToClient($client_name, $image['image_name'], $facebook_link, $instagram_link);
        if ($create_client['status'] == 1) {
            return header('location:add-clients.php');
        } else {
            $create_client['message'];
        }
    } else {
        echo $image['message'];
    }
}

function addToClient($client_name, $profile_image, $facebook_link, $instagram_link)
{
    global $conn;
    $client_name = htmlspecialchars($client_name);
    $facebook = mysqli_real_escape_string($conn, $facebook_link);
    $instagram = mysqli_real_escape_string($conn, $instagram_link);
    $sql = "INSERT INTO `client`( `company_name`, `company_logo`, `facebook_link`, `instagram_link`)
        VALUES ('$client_name','$profile_image','$facebook_link','$instagram_link')";

    if (mysqli_query($conn, $sql)) {
        return ['status' => true, 'message' => 'new member created'];
    } else {
        return ['status' => false, 'message' => $conn->error];
    }
}


function getClients()
{
    $sql = "SELECT * from client";
    global $conn;
    $data = [];
    $resulset = $conn->query($sql);
    if ($resulset->num_rows > 0) {
        while ($row = $resulset->fetch_assoc()) {
            array_push($data, $row);
        }
        return $data;
    }
}
function getTeam()
{
    $sql = "SELECT * from users";
    global $conn;
    $data = [];
    $resulset = $conn->query($sql);
    if ($resulset->num_rows > 0) {
        while ($row = $resulset->fetch_assoc()) {
            array_push($data, $row);
        }
        return $data;
    }
}
