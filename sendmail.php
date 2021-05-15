<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMaile\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = "UTF-8";
$mail->setLanguage('ru', 'PHPMailer/language/');
$mail->IsHTML(true);

// От кого письмо
$mail->setFrom('isa.agverdiev@bk.ru', 'Valentin Striakalo');
// Кому отправить
$mail->addAddress('isa.agverdiev@mail.ru');
// Тема письма
$mail->Subject = 'Привет! Это твое письмо';

$body = '<h1>Спасибо за заявку, наш менеджер свяжется с вами</h1>';

if (trim(!empty($_POST['secondname']))) {
  $body .= '<p><strong>Имя:</strong> ' . $_POST['secondname'] . '</p>';
}
if (trim(!empty($_POST['firstname']))) {
  $body .= '<p><strong>Имя:</strong> ' . $_POST['firstname'] . '</p>';
}
if (trim(!empty($_POST['patronymic']))) {
  $body .= '<p><strong>Имя:</strong> ' . $_POST['patronymic'] . '</p>';
}
if (trim(!empty($_POST['tel']))) {
  $body .= '<p><strong>Имя:</strong> ' . $_POST['tel'] . '</p>';
}
if (trim(!empty($_POST['email']))) {
  $body .= '<p><strong>Имя:</strong> ' . $_POST['email'] . '</p>';
}

// Отправление
if (!$mail->send()) {
  $message = 'Ошибка';
} else {
  $message = "Данные отправлены";
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
