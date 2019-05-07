/*

USERS PAGE FUNCTIONS
-> Gather user list as soon as document is ready

 */

let users = [];
let formMode = ''; // add or edit

// Get list of users
$(document).ready(function () {
    $.get({
        url: 'getusers.php',
        data: null,
        success: function (result) {
            users = JSON.parse(result);

            users.forEach(function (user) {
                // User row
                let userTr = document.createElement("tr");
                userTr.id = "userId" + user['idUser'];

                // User ID
                let userId = document.createElement("td");
                userId.innerHTML = user['idUser'];

                // User email
                let userEmail = document.createElement("td");
                userEmail.innerHTML = user['email'];

                // User permission level
                let userPermLevel = document.createElement("td");
                let levelName = null;
                switch (user['permLevel']) {
                    case '1':
                        levelName = "Utilisateur";
                        break;
                    case '2':
                        levelName = "HR Mod";
                        break;
                    case '3':
                        levelName = "HR Admin";
                        break;
                }
                userPermLevel.innerHTML = levelName;

                // User last login
                let userLastLogin = document.createElement("td");
                userLastLogin.innerHTML = user['lastLogin'];

                // Edit button (only if user is admin, which is assumed by the presence or not of the 'new' button)
                let editButton = document.createElement("td");
                if ($('#usersEdit').length) {
                    editButton.innerHTML = "<button type=\"button\" class=\"btn btn-warning editbtn\" onclick=\"loadData(" + user['idUser'] + ")\">Edit</button>";
                } else {
                    editButton.innerHTML = "";
                }

                // Append columns to row
                userTr.appendChild(userId);
                userTr.appendChild(userEmail);
                userTr.appendChild(userPermLevel);
                userTr.appendChild(userLastLogin);
                userTr.appendChild(editButton);

                // Finally append row to table
                $('#idUsersData').append(userTr);
            })
        }
    })
});

function validateEdit() {
    $("#editAlert").alert('close');
    let editedUserId = parseInt($("#idUserId").val()) - 1;
    let editedEmail = $("#idEmailEditInput").val();
    let editedPassword = $("#idPasswordEditInput").val();
    let editedPerm = $("#idPermEdit").children("option:selected").val();

    if (formMode === 'edit') {
        if (editedEmail === users[editedUserId]['email'] && editedPerm === users[editedUserId]['permLevel'] && (!editedPassword || editedPassword.length === 0)) {
            addAlert("Aucune modification n'a été effectuée !", 'warning');
        } else {
            $("#modalSaveEdit").modal();
            $("#idSaveEdit").on("click", function(e) {
                saveEdit(editedUserId, editedEmail, editedPassword, editedPerm, 'edit');
            })
        }
    } else {
        if (/^\s+$/.test(editedEmail) || /^\s+$/.test(editedPassword)) {
            addAlert("Vous devez renseigner tous les champs !", 'warning');
        } else {
            $("#modalSaveEdit").modal();
            $("#idSaveEdit").on("click", function(e) {
                saveEdit(editedUserId, editedEmail, editedPassword, editedPerm, 'add');
            })
        }
    }
}

function saveEdit(userId, email, password, permlevel, formMode) {
    $.post({
        url: 'saveuser.php',
        data: {userId: userId, email: email, password: password, permlevel: permlevel, formMode: formMode },
        success: function(html) {
            if (html === 'ok') {
                addAlert("Modifications enregistrées !", 'success');
            } else {
                addAlert("Erreur lors de la modification !", 'danger');
            }
        }
    });
}

function setNewUserTexts() {
    $('#idEditHeader').html('Création utilisateur');
    $('#idBtnSaveEdit').html("Créer l'utilisateur");
    $('#idUserId').val('N/A');
    $('#idEmailEditInput').val('');
    $('#idPasswordEditInput').val('');
    $('#idPermEdit').val('1');
    formMode = 'add';
}

function loadData(id) {
    if (formMode !== 'edit') {
        $('#idEditHeader').html('Modification utilisateur');
        $('#idBtnSaveEdit').html("Valider les modifications");
        formMode = 'edit';
    }
    id -= 1;
    $("#idUserId").val(users[id]['idUser']);
    $("#idEmailEditInput").val(users[id]['email']);
    $("#idPermEdit").val(users[id]['permLevel']);
}

function addAlert(text, type) {
    document.getElementById("usersEdit").insertAdjacentHTML("beforeend", "<div class=\"alert alert-" + type +" alert-dismissible fade show\" role=\"alert\" id=\"editAlert\">\n" +
        "  <strong>" + text + "</strong>" +
        "  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
        "    <span aria-hidden=\"true\">&times;</span>\n" +
        "  </button>\n" +
        "</div>");
}