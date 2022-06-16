<?php
$file_name = __DIR__ . '/gallery.json';
$current_images = [];

$current_images = $current_images = empty(json_decode(file_get_contents($file_name), TRUE)) ? [] : json_decode(file_get_contents($file_name), TRUE);

// echo rand();
function getImage()
{
    global $file_name;
    $current_images = empty(json_decode(file_get_contents($file_name), TRUE)) ? [] : json_decode(file_get_contents($file_name), TRUE);

    return $current_images;
}
function removeFromGallery($current_images, $index)
{
    unset($current_images[$index]);
    file_put_contents($GLOBALS['file_name'], json_encode($current_images));
}

function addToGallery($current_images, $imagename, $caption)
{
    array_push($current_images, [
        'imagename' => $imagename,
        'caption' => $caption
    ]);
    if (file_put_contents($GLOBALS['file_name'], json_encode($current_images))) {
        return true;
    } else {
        return false;
    }
}

if (isset($_GET['remove_action'])) {
    $imageindex = $_GET['id'];
    global $current_images;
    $array = $current_images[$imageindex];
    echo $array['imagename'];
    if (unlink('../img/gallery/' . $array['imagename'])) {
        echo "file was successfully deleted";
    } else {
        echo "there was a problem deleting the file";
    }
    removeFromGallery($current_images, $imageindex);
    return header('location:upload_image.php');
}
