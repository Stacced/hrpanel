<?php
// Database configuration file
$dbconf = parse_ini_file('dbsettings.ini');

// Filter POST data
$deptId = filter_input(INPUT_POST, 'deptId', FILTER_SANITIZE_NUMBER_INT);
$deptName = filter_input(INPUT_POST, 'deptName', FILTER_SANITIZE_STRING);
$sqlMode = filter_input(INPUT_POST, 'formMode', FILTER_SANITIZE_STRING);

try {
    // Database connection
    $pdo = new PDO('mysql:dbname=' . $dbconf['dbname'] . ';host=' . $dbconf['hostname'] . ';charset=utf8', $dbconf['username'], $dbconf['password']);
    $sql = null;

    // Check if data is not empty
    if (!empty($deptName)) {
        switch ($sqlMode) {
            case 'add':
                $sql = "INSERT INTO departments (deptName) VALUES ('$deptName');";
                break;
            case 'edit':
                $sql = "UPDATE departments SET deptName = '$deptName' WHERE idDept = '$deptId';";
                break;
            case 'delete':
                $sql = "DELETE FROM departments WHERE idDept = '$deptId';";
                break;
            default:
                // should throw exception or return
                break;
        }

        if ($pdo->exec($sql)) {
            echo 'ok';
            die();
        }
    }

    echo 'error during save';
    die();
} catch (Exception $e) {
    echo 'error during save ' . $e;
    die();
}