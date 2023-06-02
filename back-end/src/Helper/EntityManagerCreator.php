<?php

namespace ParkSistem\Helper;

use Doctrine\DBAL\DriverManager;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMSetup;

require_once "vendor/autoload.php";

class EntityManagerCreator
{
    public static function create()
    {
        // Create a simple "default" Doctrine ORM configuration for Attributes
        $config = ORMSetup::createAttributeMetadataConfiguration(
            paths: array(__DIR__ . "/.."),
            isDevMode: true,
        );

        // configuring the database connection
        $connection = DriverManager::getConnection([
            'driver' => 'pdo_mysql',
            'host' => 'localhost:3306',
            'user' => 'root',
            'dbname' => 'parksystem',
            'password' => 'cachorroquente123'
        ], $config);

        // obtaining the entity manager
        return new EntityManager($connection, $config);
    }
}
