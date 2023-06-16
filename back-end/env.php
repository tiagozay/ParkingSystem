<?php
    $envFile = __DIR__ . '/.env';

    if (file_exists($envFile)) {
        $envData = parse_ini_file($envFile);
        foreach ($envData as $key => $value) {
            putenv("$key=$value");
        }
    }
?>