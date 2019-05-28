/*
 *  Author      : Laszlo DINDELEUX / I.FA-P2A
 *  Project     : hrpanel
 *  Version     : 1.0.0
 *  File        : departments.js
 *  Description : Contains required functions for departments page
 */

let departments = [];
let formMode = null; // Used to tell PHP script which type of query it needs to do

// Triggered when document finished loading
$(document).ready(() => {
    loadDepartments();
});

/**
 * Sets texts when creating new department.
 * @return {void} Returns nothing.
 */
function setNewDeptTexts() {
    formMode = 'add';
    $('#idBtnSaveEdit').html('Créer le département');
    $('#idEditHeader').html('Création département');
    $('#idDeptId').val('N/A');
    $('#idDeptName').val('');
}

/**
 * Gets departments from database and loads them in the local array.
 * @return {void} Returns nothing.
 */
function loadDepartments() {
    let departmentsDataSelector = $('#idDepartmentsData'); // No duplicated selectors
    departmentsDataSelector.empty();

    // Check if new button needs to be added (same as edit)
    if ($('#departmentsEdit').length) {
        departmentsDataSelector.prepend("<tr>\n" +
            "                <td>N/A</td>\n" +
            "                <td>N/A</td>\n" +
            "                <td><button id=\"idBtnNewDept\" type=\"button\" class=\"btn btn-primary\" onclick=\"setNewDeptTexts()\">New</button></td>\n" +
            "            </tr>")
    }

    // Get departments with Ajax request
    $.get({
        url: 'getdepartments.php',
        data: null,
        success: (result) => {
            departments = JSON.parse(result);

            departments.forEach((dept) => {
                // Department row
                let deptTr = document.createElement('tr');
                deptTr.id = "deptId" + dept['idDept'];

                // Department ID
                let deptId = document.createElement("td");
                deptId.innerHTML = dept['idDept'];

                // Department name
                let deptName = document.createElement('td');
                deptName.innerHTML = dept['deptName'];

                // Edit button (only if currently logged user is admin, which is assumed by the presence or not of the 'new' button)
                let editButton = document.createElement("td");
                if ($('#departmentsEdit').length) {
                    editButton.innerHTML = "<button type=\"button\" class=\"btn btn-warning editbtn\" onclick=\"loadData(" + dept['idDept'] + ")\">Edit</button>";
                } else {
                    editButton.innerHTML = "";
                }

                // Append columns to row
                deptTr.appendChild(deptId);
                deptTr.appendChild(deptName);
                deptTr.appendChild(editButton);

                // Finally append row to table
                departmentsDataSelector.append(deptTr);
            })
        }
    })
}

/**
 * Loads selected department data from departments list.
 * @return {void} Returns nothing.
 */
function loadData(id) {
    if (formMode !== 'edit') {
        $('#idEditHeader').html('Modification département');
        $('#idBtnSaveEdit').html("Valider les modifications");
        formMode = 'edit';
    }
    let deptIndex = departments.findIndex((element) => { return parseInt(element.idDept) === id});
    $("#idDeptId").val(departments[deptIndex]['idDept']);
    $("#idDeptName").val(departments[deptIndex]['deptName']);
}

/**
 * Validates modified data, prompts user to proceed and if so, calls saveEdit() to save data.
 * @return {void} Returns nothing.
 */
function validateEdit() {
    $("#editAlert").alert('close');
    let deptId = $("#idDeptId").val();
    let deptName = $("#idDeptName").val();
    let deptIndex = departments.findIndex((element) => { return element.idDept === deptId });

    if (formMode === 'edit') {
        if (deptName === departments[deptIndex]['deptName']) {
            addAlert("Aucune modification n'a été effectuée !", 'warning');
        } else {
            $("#modalSaveEdit").modal();
            $("#idSaveEdit").on("click", () => {
                saveEdit(deptId, deptName,'edit');
            });
        }
    } else {
        if (/^\s+$/.test(deptName)) {
            addAlert("Vous devez renseigner tous les champs !", 'warning');
        } else {
            $("#modalSaveEdit").modal();
            $("#idSaveEdit").on("click", () => {
                saveEdit(deptId, deptName, 'add');
            });
        }
    }
}

/**
 * Queries PHP script with Ajax to save new data to database.
 * @return {void} Returns nothing.
 */
function saveEdit(deptId, deptName, formMode) {
    // Send data to PHP script
    $.post({
        url: 'dept-edit.php',
        data: {deptId: deptId, deptName: deptName, formMode: formMode },
        success: function(html) {
            if (html === 'ok') {
                addAlert("Modifications enregistrées !", 'success');
                loadDepartments(); // Dynamic departments list reload
            } else {
                addAlert("Erreur lors de la modification !", 'danger');
            }
        }
    });

    // Needed because click event was registered twice.
    $('#idSaveEdit').unbind();
}

/**
 * Deletes currently selected department from database.
 * @return {void} Returns nothing.
 */
function deleteDept() {
    $("#editAlert").alert('close');

    let deptId = $("#idDeptId").val();
    if (deptId === "") {
        addAlert("Suppression impossible, aucun département sélectionné", "warning");
    } else {
        $('#modalSaveEdit').modal();
        $('#idSaveEdit').on('click', () => {
            saveEdit(deptId, 'N/A', 'delete');
        })
    }
}

/**
 * Creates Bootstrap alert and appends it to edit zone.
 * @return {void} Returns nothing.
 */
function addAlert(text, type) {
    document.getElementById("departmentsEdit").insertAdjacentHTML("beforeend", "<div class=\"alert alert-" + type +" alert-dismissible fade show\" role=\"alert\" id=\"editAlert\">\n" +
        "  <strong>" + text + "</strong>" +
        "  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
        "    <span aria-hidden=\"true\">&times;</span>\n" +
        "  </button>\n" +
        "</div>");
}