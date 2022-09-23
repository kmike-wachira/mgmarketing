<?php
function addImage($target_dir, $tmp_file)
{
    $target_file = $target_dir . basename($tmp_file["name"]);
    $tmp_file_s = $tmp_file['tmp_name'];
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
    $file_size = $tmp_file['size'];
    $file_name = $tmp_file['name'];
    $message = '';

    // Check if image file is a actual image or fake image
    $check = getimagesize($tmp_file['tmp_name']);
    if ($check !== false) {
        $message .= "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        $message .= "File is not an image.";
        $uploadOk = 0;
    }

    // Check if file already exists
    if (file_exists($target_file)) {
        $message .= "Sorry, file already exists.";
        $uploadOk = 0;
    }

    // Check file size
    if ($file_size > 10000000) {
        $message .= "Sorry, your file is too large.";
        $uploadOk = 0;
    }

    // Allow certain file formats
    if (
        $imageFileType != "jpg" && $imageFileType != "png"
    ) {
        $message .= "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
        $uploadOk = 0;
    }

    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        $message .= "Sorry, your file was not uploaded.";
        // if everything is ok, try to upload file
    } else {
        $rand = rand();
        $image_name = $rand . htmlspecialchars(basename($file_name));
        $tmp_name = $tmp_file["tmp_name"];
        $image_name = $rand . htmlspecialchars(basename($tmp_file["name"]));
        if (move_uploaded_file($tmp_name, $target_dir . $image_name)) {
            return ['uploaded' => true, 'message' => 'upload complete', 'image_name' => $image_name];
        } else {
            return ['uploaded' => false, 'message' => $message];
        }
    }
}
