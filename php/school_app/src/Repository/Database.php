<?php namespace SchoolApp\Repository;


class Database {
    private static function mongoClient() {
        return new \MongoDB\Client($_ENV['MONGODB_URI']);
    }

    static function getInstance() {
        return Database::mongoClient()->selectDatabase($_ENV['DATABASE']);
    }
}

?>
