<?php
// Starting session
session_start();

// Parsing database configuration & defining passed params
$dbconf = parse_ini_file('dbsettings.ini');
$email = filter_input(INPUT_POST, "email", FILTER_SANITIZE_EMAIL);
$pwd = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);
$err = false;

// Provide email to index.php
$_SESSION['emailTry'] = $email;

// Email & password check
if (!empty($email) || !empty($pwd)) {
    if (empty($email)) {
        echo <<<EOF
<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>Erreur !</strong> Email non renseigné !
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>
EOF;
    }

    if (empty($pwd)) {
        echo <<<EOF
<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>Erreur !</strong> Mot de passe non renseigné !
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>
EOF;
        $err = true;
    }
} else {
    $err = true;
}

// Create PDO if no errors
if (!$err) {
    try {
        $pdo = new PDO("mysql:dbname=" . $dbconf['dbname'] . ";host=" . $dbconf['hostname'] . ";charset=utf8", $dbconf['username'], $dbconf['password']);
    } catch (PDOException $e) {
        echo <<<EOF
<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>Erreur !</strong> Connexion à la base de données impossible
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>
EOF;
        die();
    }

    $hashedPwd = strtoupper(hash('sha256', $pwd));
    $pdoStatement = $pdo->query("SELECT email, password FROM users WHERE email = '$email' AND password = '$hashedPwd'");
    $userData = $pdoStatement->fetch(PDO::FETCH_ASSOC);

    if (!empty($userData) && $pdoStatement->rowCount() == 1) {
        $_SESSION['loggedin'] = true;
        $_SESSION['email'] = $userData['email'];
        echo "ok";
    } else {
        echo <<<EOF
<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>Erreur !</strong> Adresse email ou mot de passe incorrect
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>
EOF;
        die();
    }
}