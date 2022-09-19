<?php namespace SchoolApp\Controller;

class Students {
    static function index() {
        $students = \SchoolApp\Repository\Students::getAll();
        \SchoolApp\View\Students::index($students);
    }
}

?>
