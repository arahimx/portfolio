<?php
$response = array("status" => "", "message" => "");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "arawan0316@gmail.com"; // Replace with your email address
    $subject = "Contact Form Submission";

    $fullname = $_POST["fullname"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    $messageBody = "Full Name: $fullname\n";
    $messageBody .= "Email: $email\n";
    $messageBody .= "Message:\n$message";

    $headers = "From: $email";

    if (mail($to, $subject, $messageBody, $headers)) {
        $response["status"] = "success";
        $response["message"] = "Your message has been sent successfully!";
    } else {
        $response["status"] = "error";
        $response["message"] = "Oops! Something went wrong. Please try again later.";
    }

    echo json_encode($response);
}
?>
