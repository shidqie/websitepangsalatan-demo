<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "marketingwisataalampangsalatan@gmail.com"; 
    
    $name    = htmlspecialchars($_POST["first_name"]);
    $email   = htmlspecialchars($_POST["user_email"]);
    $subject = htmlspecialchars($_POST["subject"]);
    $message = htmlspecialchars($_POST["message"]);

    $fullSubject = "Website Contact: " . $subject;
    $body  = "Nama: $name\n";
    $body .= "Email: $email\n";
    $body .= "Pesan:\n$message";

    $headers = "From: $email\r\nReply-To: $email";

    if (mail($to, $fullSubject, $body, $headers)) {
        echo "Pesan berhasil dikirim!";
    } else {
        echo "Gagal mengirim pesan.";
    }
}
?>