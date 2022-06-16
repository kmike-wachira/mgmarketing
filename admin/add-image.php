<?php

function uploadImage($imagefolder)
{
    $target_dir = "../img/" . $imagefolder;
    $target_file = $target_dir . basename($_FILES["file_to_upload"]["name"]);
    $tmp_file = $_FILES["file_to_upload"]["tmp_name"];
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // Check if image file is a actual image or fake image
    $check = getimagesize($_FILES["file_to_upload"]["tmp_name"]);
    if ($check !== false) {
        echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        echo "File is not an image.";
        $uploadOk = 0;
    }


    // Check if file already exists
    if (file_exists($target_file)) {
        echo "Sorry, file already exists.";
        $uploadOk = 0;
    }

    // Check file size
    if ($_FILES["file_to_upload"]["size"] > 10000000) {
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
        $tmp_name = $_FILES["file_to_upload"]["tmp_name"];
        $image_name = $rand . htmlspecialchars(basename($_FILES["file_to_upload"]["name"]));
        if (move_uploaded_file($tmp_name, $target_dir . $image_name)) {
            echo "The file " . $image_name . " has been uploaded.";
        } else {
            // something went wrong
        }
    }
}
