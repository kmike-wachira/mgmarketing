<?php
include 'fileoperation.php';

$target_dir = "../img/gallery/";
$file_upload_name = $_FILES["file_to_upload"]["name"];
$target_file = $target_dir . basename($file_upload_name);
$tmp_file_name = $_FILES["file_to_upload"]["tmp_name"];
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
$file_size = $_FILES["file_to_upload"]["size"];

// Check if image file is a actual image or fake image
if (isset($_POST["submit"])) {
    $check = getimagesize($tmp_file_name);
    if ($check !== false) {
        echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        echo "File is not an image.";
        $uploadOk = 0;
    }
}

// Check if file already exists
if (file_exists($target_file)) {
    echo "Sorry, file already exists.";
    $uploadOk = 0;
}

// Check file size
if ($file_size > 10000000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}

// Allow certain file formats
if (
    $imageFileType != "jpg" && $imageFileType != "png"
) {
    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
    // if everything is ok, try to upload file
} else {
    $rand = rand();
    $image_name = $rand . htmlspecialchars(basename($file_upload_name));
    if (move_uploaded_file($tmp_file_name, $target_dir . $image_name)) {
        echo "The file " . $image_name . " has been uploaded.";
        if (addToGallery($current_images, $image_name, htmlspecialchars($_POST['caption']))) {
            return header('location:upload_image.php');
        } else {
            unlink($target_dir . $image_name);
            return header('location:upload_image.php');
        }
    } else {
        echo "Sorry, there was an error uploading your file.";
        return header('location:upload_image.php');

    }
}
