<?php
// Start session
session_start();

// Parse database configuration file
$dbconf = parse_ini_file('dbsettings.ini');

// Filter POST data
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$pwd = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_STRING);
$confPwd = filter_input(INPUT_POST, 'confirmPassword', FILTER_SANITIZE_STRING);
$err = false;

// Email & password check
if (!empty($email) || !empty($pwd) || !empty($confPwd)) { // !empty actually checks if field is set and not empty
    if (empty($email)) {
        echo <<<EOF
<div class="alert alert-danger alert-dismissible fade show" role="alert" id="idAlert">
    <strong>Erreur !</strong> Email non renseigné !
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>
EOF;
        $err = true;
    }

    if (empty($pwd)) {
        echo <<<EOF
<div class="alert alert-danger alert-dismissible fade show" role="alert" id="idAlert">
    <strong>Erreur !</strong> Mot de passe non renseigné !
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>
EOF;
        $err = true;
    }

    if (empty($confPwd)) {
        echo <<<EOF
<div class="alert alert-danger alert-dismissible fade show" role="alert" id="idAlert">
    <strong>Erreur !</strong> Confirmation de mot de passe non renseignée !
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
        $pdo = new PDO('mysql:dbname=' . $dbconf['dbname'] . ';host=' . $dbconf['hostname'] . ';charset=utf8', $dbconf['username'], $dbconf['password']);
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

    try {
        // Check if an user with passed email already exists
        $users = $pdo->query('SELECT * FROM users')->fetchAll(PDO::FETCH_ASSOC);
        $alreadyExists = false;
        foreach ($users as $user) {
            if ($user['email'] === $email) {
                $alreadyExists = true;
                break;
            }
        }

        // If so, display according error
        if ($alreadyExists) {
            echo <<<EOF
<div class="alert alert-danger alert-dismissible fade show" role="alert" id="idAlert">
    <strong>Erreur !</strong> Cet email est déjà utilisé
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>
EOF;
            die();
        }

        // Create user on database
        $hashedPwd = strtoupper(hash('sha256', $pwd));
        $lastLogin = date('Y-m-d G:i:s');

        // Check if user is successfully added to database
        if ($pdo->exec("INSERT INTO users (email, password, permLevel, lastLogin) VALUES ('$email', '$hashedPwd', '1', '$lastLogin')")) {
            $_SESSION['loggedin'] = true;
            $_SESSION['email'] = $email;
            $_SESSION['permLevel'] = 1;
            $_SESSION['lastLogin'] = $lastLogin;
            echo 'ok';
        } else {
            echo <<<EOF
<div class="alert alert-danger alert-dismissible fade show" role="alert" id="idAlert">
    <strong>Erreur !</strong> Création impossible
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>
EOF;
            die();
        }
    }
    catch (Exception $e) {
        echo 'something went wrong';
        die();
    }
}