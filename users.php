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
    <?php include 'nav.inc.php' ?>
</header>

<div id="usersWrapper">
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
            <tr>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td><button id="idBtnNewUser" type="button" class="btn btn-primary" onclick="setNewUserTexts()">New</button></td>
            </tr>
        </tbody>
    </table>
    <div id="usersEdit">
        <form id="form-box">
            <h2 id="idEditHeader">Modification utilisateur</h2>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="idEmailEditInput">Adresse email</label>
                    <input type="email" name="emailEdit" class="form-control" id="idEmailEditInput" required>
                </div>
                <div class="form-group col-md-6">
                    <label for="idPasswordEditInput">Mot de passe</label>
                    <input type="password" name="passwordEdit" class="form-control" id="idPasswordEditInput" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="idPermEdit">Niveau de permission</label>
                    <select id="idPermEdit" class="form-control">
                        <option value="1">Utilisateur</option>
                        <option value="2">HR Mod</option>
                        <option value="3">HR Admin</option>
                    </select>
                </div>
                <div class="form-group col-md-2">
                    <label for="idUserId">ID :</label>
                    <input type="text" id="idUserId" class="form-control" readonly>
                </div>
            </div>
            <button id="idBtnSaveEdit" type="button" class="btn btn-primary" onclick="validateEdit()">Valider les modifications</button>
        </form>
    </div>

    <div class="modal fade" id="modalSaveEdit" tabindex="-1" role="dialog" aria-labelledby="modalSaveEdit" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalSaveEditTitle">Attention !</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Êtes-vous sûr de vouloir enregistrer les modifications ?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal" >Non, annuler</button>
                    <button type="button" class="btn btn-success" data-dismiss="modal" id="idSaveEdit">Oui</button>
                </div>
            </div>
        </div>
    </div>
</div>


<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
<script src="js/users.js"></script>
</body>
</html>
