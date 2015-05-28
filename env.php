<?php
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

$to = 'ruedakax@yahoo.com';
$subject = 'amouth contact';
$message = 'FROM: '.$name.' Email: '.$email.'Message: '.$message;
$headers = 'From: ruedakax@yahoo.com' . "\r\n";

if (filter_var($email, FILTER_VALIDATE_EMAIL)) { // this line checks that we have a valid email address
	if(mail($to, $subject, $message, $headers))
		echo "Tu mensaje fue enviado"; //This method sends the mail.
	else
		echo "Error : intentelo más tarde"; // success message
}else{
	echo "Error : email invalido";
}
?>