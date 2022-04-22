<?php
$from = $_POST['email'];
$subject = $_POST['subject'];
$name = $_POST['name'];
$message = $_POST['message'];
// $to = 'mike@mgmarketing.co.ke';
// // echo ($from ."  " . $subject ."  " . $message."");
// $headers = array(
//     'From' => $from,
//     'Reply-To' => $from,
//     'X-Mailer' => 'PHP/' . phpversion()
// );
// if (isset($from) && isset($name) && isset($subject) && isset($message)) {
//     if (mail($to, $subject, $message, $headers)) {
//         echo json_encode(array('message' => "message-sent"));
//     } else {
//         echo json_encode(array('message' => error_get_last()['message']));
//     }
// } else {
//     echo json_encode(array('message' => error_get_last()['message']));
// }

// Import PHPMailer classes into the global namespace 
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include PHPMailer library files 
require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';



// Create an instance of PHPMailer class 
$mail = new PHPMailer;

// SMTP configuration
$mail->isSMTP();
$mail->Host     = 'mail.mgmarketing.co.ke';
$mail->SMTPAuth = true;
$mail->Username = 'info@mgmarketing.co.ke';
$mail->Password = 'info@mgmarketing101';
$mail->SMTPSecure = 'tls';
$mail->Port     = 465;

// Sender info 
$mail->setFrom($from, $name);
$mail->addReplyTo($from, $name);

// Add a recipient 
$mail->addAddress('info@mgmarketing.co.ke');

// Add cc or bcc  
// $mail->addCC('cc@example.com'); 
// $mail->addBCC('bcc@example.com'); 

// Email subject 
$mail->Subject = 'Send Email via SMTP using PHPMailer';

// Set email format to HTML 
$mail->isHTML(true);

// Email body content 
$mailContent = ' 
    <h2>Message From Site</h2>  </br></br>
    <p><b> From : </b> ' . htmlspecialchars($name) . '</p> </br>
    <p> ' . htmlspecialchars($message) . '</p>';
$mail->Body = $mailContent;

// Send email 
if (!$mail->send()) {
    echo json_encode(array('message' => error_get_last()['message']));
} else {
    echo json_encode(array('message' => "message-sent"));
}
