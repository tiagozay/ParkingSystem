<?php

namespace ParkSistem\Helper;

use Doctrine\DBAL\DriverManager;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMSetup;

require_once "vendor/autoload.php";
require_once __DIR__."/../../env.php";

class EntityManagerCreator
{
    public static function create()
    {

        $host = getenv('DB_HOST');
        $dbName = getenv('DB_DATABASE');
        $user = getenv('DB_USERNAME');
        $password = getenv('DB_PASSWORD');

        // Create a simple "default" Doctrine ORM configuration for Attributes
        $config = ORMSetup::createAttributeMetadataConfiguration(
            paths: array(__DIR__ . "/.."),
            isDevMode: true,
        );

        // configuring the database connection
        $connection = DriverManager::getConnection([
            'driver' => 'pdo_mysql',
            'host' => $host,
            'user' => $user,
            'dbname' => $dbName,
            'password' => $password
        ], $config);

        // obtaining the entity manager
        return new EntityManager($connection, $config);
    }
}
