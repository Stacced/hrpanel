<?php
// Start session
session_start();

// Define active page
$_SESSION['activePage'] = 'login';

// Check if user is already logged in
if (!empty($_SESSION['loggedin'])) {
    header('Location: users.php');
}

// Define $email for variable value
$email = isset($_SESSION['emailTry']) ? $_SESSION['emailTry'] : '';
?>
<!DOCTYPE HTML>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>HR Panel - Home</title>
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>
<body>
<header>
    <?php include 'nav.inc.php' ?>
</header>

<div id="middleWrapper">
    <div id="form-box">
        <h2>Login</h2>
        <form>
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
            <button type="button" class="btn btn-primary" onclick="checkCredentials()">Se connecter</button>
        </form>
    </div>
</div>

<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
<script src="js/index.js"></script>
</body>
</html>
