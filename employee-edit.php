<?php
// Parse database configuration file
$dbconf = parse_ini_file('dbsettings.ini');

// Filter POST data
$employeeId = filter_input(INPUT_POST, 'employeeId', FILTER_SANITIZE_NUMBER_INT);
$firstname = filter_input(INPUT_POST, 'firstname', FILTER_SANITIZE_STRING);
$lastname = filter_input(INPUT_POST, 'lastname', FILTER_SANITIZE_STRING);
$dept = filter_input(INPUT_POST, 'dept', FILTER_SANITIZE_NUMBER_INT);
$street = filter_input(INPUT_POST, 'street', FILTER_SANITIZE_STRING);
$postalCode = filter_input(INPUT_POST, 'postalCode', FILTER_SANITIZE_STRING);
$city = filter_input(INPUT_POST, 'city', FILTER_SANITIZE_STRING);
$sqlMode = filter_input(INPUT_POST, 'formMode', FILTER_SANITIZE_STRING);

try {
    // Database connection
    $pdo = new PDO('mysql:dbname=' . $dbconf['dbname'] . ';host=' . $dbconf['hostname'] . ';charset=utf8', $dbconf['username'], $dbconf['password']);
    $sql = null;

    // Check if POST data is not empty
    if (!empty($firstname) && !empty($lastname) && !empty($dept) && !empty($street) && !empty($postalCode) && !empty($city)) {
        switch ($sqlMode) {
            case 'add':
                $sql = "INSERT INTO employees (firstname, lastname, addrStreet, addrPostalCode, addrCity, idDept) VALUES ('$firstname', '$lastname', '$street', '$postalCode', '$city', '$dept')";
                break;
            case 'edit':
                $sql = "UPDATE employees SET firstname = '$firstname', lastname = '$lastname', addrStreet = '$street', addrPostalCode = '$postalCode', addrCity = '$city', idDept = '$dept' WHERE idEmployee = '$employeeId';";
                break;
            case 'delete':
                $sql = "DELETE FROM employees WHERE idEmployee = '$employeeId'";
                break;
            default:
                // should throw exception or return
                break;
        }

        // Check if query is successfully executed
        if ($pdo->exec($sql)) {
            echo 'ok';
            die();
        }
    }

    echo 'error during save';
    die();
}
catch (Exception $e) {
    echo 'error during save ' . $e;
    die();
}