<?php
// Database configuration file
$dbconf = parse_ini_file('dbsettings.ini');

// POST data
$userId = filter_input(INPUT_POST, 'userId', FILTER_SANITIZE_NUMBER_INT);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_STRING);
$permlevel = filter_input(INPUT_POST, 'permlevel', FILTER_SANITIZE_NUMBER_INT);
$sqlMode = filter_input(INPUT_POST, 'formMode', FILTER_SANITIZE_STRING);

// Adjust ID to DB
++$userId;

try {
    // Database connection
    $pdo = new PDO('mysql:dbname=' . $dbconf['dbname'] . ';host=' . $dbconf['hostname'] . ';charset=utf8', $dbconf['username'], $dbconf['password']);
    $sql = null;

    switch ($sqlMode) {
        case 'add':
            if (!empty($password)) {
                $password = strtoupper(hash('sha256', $password));
                $sql = "INSERT INTO users (email, password, permLevel) VALUES ('$email', '$password', '$permlevel')";
            }
            break;
        case 'edit':
            if (!empty($password)) {
                $password = strtoupper(hash('sha256', $password));
                $sql = "UPDATE users SET email = '$email', password = '$password', permLevel = '$permlevel' WHERE idUser = '$userId';";
            } else {
                $sql = "UPDATE users SET email = '$email', permLevel = '$permlevel' WHERE idUser = '$userId'";
            }
            break;
    }


    if ($pdo->exec($sql)) {
        echo 'ok';
        die();
    }

    echo 'error during save';
    die();
} catch (PDOException $e) {
    echo 'error during save';
    die();
}