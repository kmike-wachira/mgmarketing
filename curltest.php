<?php
// initialise request
// $curl=curl_init();
// // define the url parameter
// $url="https://jsonplaceholder.typicode.com/comments";
// // set url option
// curl_setopt($curl , CURLOPT_URL,$url);
// curl_setopt($curl,CURLOPT_RETURNTRANSFER,1);
// $result=curl_exec($curl);
// $result=json_decode($result,true);
// // print_r($result);
// foreach($result as $key => $res){
//     echo $key."   " .$res['name'] ."</br>";
// }
// curl_close($curl);



$ch = curl_init('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials');
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Authorization: Bearer cFJZcjZ6anEwaThMMXp6d1FETUxwWkIzeVBDa2hNc2M6UmYyMkJmWm9nMHFRR2xWOQ==']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$response = curl_exec($ch);
curl_close($ch);
echo $response;
