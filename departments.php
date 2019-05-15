<?php
// Start session
session_start();

// Define active page
$_SESSION['activePage'] = 'departments';

// Check if user is at least HR Admin
$isAdmin = $_SESSION['permLevel'] >= 3;

// Check if user is logged in
if (empty($_SESSION['loggedin'])) {
    header('Location: index.php');
    die();
}
?>
<!DOCTYPE HTML>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>HR Panel - Départements</title>
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>
<body>
<header>
    <?php include 'nav.inc.php' ?>
</header>
<div id="departmentsWrapper">
    <table id="idDepartmentsTable">
        <thead>
        <tr>
            <th>ID</th>
            <th>Nom département</th>
        </tr>
        </thead>
        <tbody id="idDepartmentsData">
        <tr>
            <td>N/A</td>
            <td>N/A</td>
            <?php if ($isAdmin) { ?>
                <td><button id="idBtnNewDept" type="button" class="btn btn-primary" onclick="setNewDeptTexts()">New</button></td>
            <?php } ?>
        </tr>
        </tbody>
    </table>
    <?php if ($isAdmin) { ?>
        <div id="departmentsEdit">
            <form id="form-box">
                <h2 id="idEditHeader">Modification département</h2>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="idDeptName">Nom du département</label>
                        <input type="text" name="deptNameEdit" class="form-control" id="idDeptName" required>
                    </div>
                    <div class="form-group col-md-3">
                        <label for="idDeptId">ID :</label>
                        <input type="text" id="idDeptId" class="form-control" readonly>
                    </div>
                </div>
                <button id="idBtnSaveEdit" type="button" class="btn btn-primary" onclick="validateEdit()">Valider les modifications</button>
                <button id="idBtnDelete" type="button" class="btn btn-danger" onclick="deleteDept()">Supprimer le département</button>
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
    <?php } ?>
</div>
<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
<script src="js/departments.js"></script>
</body>
</html>

