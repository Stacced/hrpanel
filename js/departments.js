let departments = [];
let formMode = null;

$(document).ready(() => {
    loadDepartments();
});

function setNewDeptTexts() {
    formMode = 'add';
    $('#idBtnSaveEdit').html('Créer le département');
    $('#idEditHeader').html('Création département');
    $('#idDeptId').val('N/A');
    $('#idDeptName').val('');
}

// Load departments from database
function loadDepartments() {
    let departmentsDataSelector = $('#idDepartmentsData'); // No duplicated selectors ! yay
    departmentsDataSelector.empty();

    // Check if new button needs to be added (same as edit)
    if ($('#departmentsEdit').length) {
        departmentsDataSelector.prepend("<tr>\n" +
            "                <td>N/A</td>\n" +
            "                <td>N/A</td>\n" +
            "                <td><button id=\"idBtnNewDept\" type=\"button\" class=\"btn btn-primary\" onclick=\"setNewDeptTexts()\">New</button></td>\n" +
            "            </tr>")
    }

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

                // Edit button (only if employee is admin, which is assumed by the presence or not of the 'new' button)
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

function deleteDept() {

}