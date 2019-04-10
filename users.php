<?php
// Start session
session_start();

// Define active page
$_SESSION['activePage'] = 'users';

// Check if user is logged in
if (empty($_SESSION['loggedin'])) {
    header("Location: index.php");
    die();
}
?>
<!DOCTYPE HTML>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>HR Panel - Utilisateurs</title>
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>
<body>
<header>
    <?php include('nav.inc.php') ?>
</header>

<table id="idUsersTable">
    <thead>
    <tr>
        <th>ID</th>
        <th>Email</th>
        <th>Permission level</th>
        <th>Last successful login</th>
    </tr>
    </thead>
    <tbody id="idUsersData">
    </tbody>
</table>

<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
<script>
$(document).ready(function() {
    $.get({
        url: 'getusers.php',
        data: null,
        success: function(result) {
            let users = JSON.parse(result);

            users.forEach(function(user) {
                let userTr = document.createElement("tr");

                let userId = document.createElement("td");
                userId.innerHTML = user['idUser'];

                let userEmail = document.createElement("td");
                userEmail.innerHTML = user['email'];

                let userPermLevel = document.createElement("td");
                userPermLevel.innerHTML = user['permLevel'];

                let userLastLogin = document.createElement("td");
                userLastLogin.innerHTML = user['lastLogin'];

                userTr.appendChild(userId);
                userTr.appendChild(userEmail);
                userTr.appendChild(userPermLevel);
                userTr.appendChild(userLastLogin);
                $('#idUsersData').append(userTr);
            })
        }
    })
})
</script>
</body>
</html>
