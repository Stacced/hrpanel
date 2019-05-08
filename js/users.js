/*

USERS PAGE FUNCTIONS
-> Gather user list as soon as document is ready

 */

let users = [];
let formMode = ''; // add or edit

// Get list of users
$(document).ready(() => {
    loadUsers();
});

function validateEdit() {
    $("#editAlert").alert('close');
    let editedUserId = parseInt($("#idUserId").val());
    let editedEmail = $("#idEmailEditInput").val();
    let editedPassword = $("#idPasswordEditInput").val();
    let editedPerm = $("#idPermEdit").children("option:selected").val();
    let userIndex = users.findIndex((element) => { return parseInt(element.idUser) === editedUserId});

    if (formMode === 'edit') {
        if (editedEmail === users[userIndex]['email'] && editedPerm === users[userIndex]['permLevel'] && (!editedPassword || editedPassword.length === 0)) {
            addAlert("Aucune modification n'a été effectuée !", 'warning');
        } else {
            $("#modalSaveEdit").modal();
            $("#idSaveEdit").on("click", () => {
                saveEdit(editedUserId, editedEmail, editedPassword, editedPerm, 'edit');
            });
        }
    } else {
        if (/^\s+$/.test(editedEmail) || /^\s+$/.test(editedPassword)) {
            addAlert("Vous devez renseigner tous les champs !", 'warning');
        } else {
            $("#modalSaveEdit").modal();
            $("#idSaveEdit").on("click", () => {
                saveEdit(editedUserId, editedEmail, editedPassword, editedPerm, 'add');
            });
        }
    }
}

function saveEdit(userId, email, password, permlevel, formMode) {
    $.post({
        url: 'useredit.php',
        data: {userId: userId, email: email, password: password, permlevel: permlevel, formMode: formMode },
        success: function(html) {
            if (html === 'ok') {
                addAlert("Modifications enregistrées !", 'success');
                loadUsers();
            } else {
                addAlert("Erreur lors de la modification !", 'danger');
            }
        }
    });

    // Needed because click event was registered twice.
    $('#idSaveEdit').unbind();
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
    let userIndex = users.findIndex((element) => { return parseInt(element.idUser) === id});
    $("#idUserId").val(users[userIndex]['idUser']);
    $("#idEmailEditInput").val(users[userIndex]['email']);
    $("#idPermEdit").val(users[userIndex]['permLevel']);
}

function deleteUser() {
    $("#editAlert").alert('close');

    if ($('#idUserId').val() === "") {
        addAlert("Suppression impossible, aucun utilisateur sélectionné", "warning");
    } else {
        $('#modalSaveEdit').modal();
        $('#idSaveEdit').on('click', () => {
            let userId = $("#idUserId").val();
            saveEdit(userId, null, null, null, 'delete');
        })
    }
}

function addAlert(text, type) {
    document.getElementById("usersEdit").insertAdjacentHTML("beforeend", "<div class=\"alert alert-" + type +" alert-dismissible fade show\" role=\"alert\" id=\"editAlert\">\n" +
        "  <strong>" + text + "</strong>" +
        "  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
        "    <span aria-hidden=\"true\">&times;</span>\n" +
        "  </button>\n" +
        "</div>");
}

function loadUsers() {
    let userDataSelector = $('#idUsersData');
    userDataSelector.empty();

    // Check if new button needs to be added (same as edit)
    if ($('#usersEdit').length) {
        userDataSelector.prepend("<tr>\n" +
            "                <td>N/A</td>\n" +
            "                <td>N/A</td>\n" +
            "                <td>N/A</td>\n" +
            "                <td>N/A</td>\n" +
            "                <td><button id=\"idBtnNewUser\" type=\"button\" class=\"btn btn-primary\" onclick=\"setNewUserTexts()\">New</button></td>\n" +
            "            </tr>")
    }

    // Get users
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
    });
}