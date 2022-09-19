<?php namespace SchoolApp\Repository;

class Students {
    static function getAll() {
        return \SchoolApp\Repository\Database::getInstance()->students->find();
    }
}

?>
