/*

USERS PAGE FUNCTIONS
-> Gather user list as soon as document is ready

 */

let users = [];

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

                // Edit button
                let editButton = document.createElement("td");
                editButton.innerHTML = "<button type=\"button\" class=\"btn btn-warning\" onclick=\"loadData(" + user['idUser'] + ")\">Edit</button>";

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

    if (editedEmail === users[editedUserId]['email'] && editedPerm === users[editedUserId]['permLevel'] && (!editedPassword || editedPassword.length === 0)) {
        document.getElementById("usersEdit").insertAdjacentHTML("beforeend", "<div class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\" id=\"editAlert\">\n" +
            "  <strong>Aucune modification n'a été effectuée !</strong>" +
            "  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
            "    <span aria-hidden=\"true\">&times;</span>\n" +
            "  </button>\n" +
            "</div>");
    } else {
        $("#modalSaveEdit").modal();
        $("#idSaveEdit").on("click", function(e) {
            saveEdit(editedUserId, editedEmail, editedPassword, editedPerm);
        })
    }
}

function saveEdit(userId, email, password, permlevel) {
    $.post({
        url: 'saveuser.php',
        data: {userId: userId, email: email, password: password, permlevel: permlevel },
        success: function() {

        }
    });
}

function loadData(id) {
    id -= 1;
    $("#idUserId").val(users[id]['idUser']);
    $("#idEmailEditInput").val(users[id]['email']);
    $("#idPermEdit").val(users[id]['permLevel']);
};