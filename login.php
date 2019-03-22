<?php
session_start();

if (isset($_SESSION['loggedin'])) {
    header("Location: home.php");
    die();
}

$dbconf = parse_ini_file('dbsettings.ini');
$email = filter_input(INPUT_POST, "email", FILTER_SANITIZE_EMAIL);
$pwd = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);
$err = false;

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
        $err = true;
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

if (!$err) {
    try {
        $pdo = new PDO("mysql:dbname=" . $dbconf['dbname'] . ";host=" . $dbconf['hostname'] . ";charset=utf8", $dbconf['username'], $dbconf['password']);
    } catch (PDOException $e) {
        echo $e->getMessage();
        die();
    }

    $hashedPwd = strtoupper(hash('sha256', $pwd));
    $pdoStatement = $pdo->query("SELECT email, password FROM users WHERE email = '$email' AND password = '$hashedPwd'");
    $userData = $pdoStatement->fetch(PDO::FETCH_ASSOC);

    if (!empty($userData) && $pdoStatement->rowCount() == 1) {
        header("Location: home.php");
        $_SESSION['loggedin'] = true;
        $_SESSION['user'] = $userData['email'];
    } else {
        echo <<<EOF
<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>Erreur !</strong> Adresse email ou mot de passe incorrect
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>
EOF;
    }
}
?>

<div id="form-box">
    <h2>Login</h2>
    <form action="" method="POST">
        <div class="form-group">
            <label for="idEmailInput">Adresse email</label>
            <input type="email" name="email" class="form-control" id="idEmailInput" placeholder="Entrez votre email"
                   required value="<?= $email ?>">
        </div>
        <div class="form-group">
            <label for="idPasswordInput">Mot de passe</label>
            <input type="password" name="password" class="form-control" id="idPasswordInput"
                   placeholder="Entrez votre mot de passe" required>
        </div>
        <button type="submit" class="btn btn-primary">Se connecter</button>
    </form>
</div>
