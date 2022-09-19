<?php namespace SchoolApp;

require __DIR__ . '/../vendor/autoload.php';

switch ($_SERVER['REQUEST_URI']) {
    case "/students":
        \SchoolApp\Controller\Students::index();
        break;
    default:
        echo "OOPS";
}
?>
