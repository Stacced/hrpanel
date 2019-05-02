<?php
// Get database configuration
$dbconf = parse_ini_file('dbsettings.ini');

try {
    // Database connection
    $pdo = new PDO('mysql:dbname=' . $dbconf['dbname'] . ';host=' . $dbconf['hostname'] . ';charset=utf8', $dbconf['username'], $dbconf['password']);

    // Get users in array of arrays
    $users = $pdo->query('SELECT * FROM users')->fetchAll(PDO::FETCH_ASSOC);

    // Encode data in JSON
    echo json_encode($users);
} catch (PDOException $e) {
    echo <<<EOF
<div class="alert alert-danger alert-dismissible fade show" role="alert" id="idAlert">
    <strong>Erreur !</strong> Connexion à la base de données impossible
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>
EOF;
    die();
}