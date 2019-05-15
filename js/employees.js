let employees = [];
let departments = [];
let formMode = null;

$(document).ready(() => {
    loadEmployees();
    loadDepartments();
});

// Replace edit texts with new employee texts, much fancy
function setNewEmployeeTexts() {
    $('#idEditHeader').html('Création employé');
    $('#idBtnSaveEdit').html("Créer l'employé");
    $('#idEmployeeId').val('N/A');
    $('#idFirstnameInput').val('');
    $('#idLastnameInput').val('');
    $('#idStreetInput').val('');
    $('#idCityInput').val('');
    $('#idPostalCodeInput').val('');
    $('#idDeptEdit').val('');
    formMode = 'add';
}

// Delete selected employee
function deleteEmployee() {
    $("#editAlert").alert('close');

    let employeeId = $("#idEmployeeId").val();
    if (employeeId === "") {
        addAlert("Suppression impossible, aucun employé sélectionné", "warning");
    } else {
        $('#modalSaveEdit').modal();
        $('#idSaveEdit').on('click', () => {
            saveEdit(employeeId, 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'delete');
        })
    }
}

// Validate edited values of employee and call saveEdit()
function validateEdit() {
    $("#editAlert").alert('close');
    let employeeId = $("#idEmployeeId").val();
    let employeeFirstname = $("#idFirstnameInput").val();
    let employeeLastname = $("#idLastnameInput").val();
    let employeeDept = $('#idDeptEdit').val();
    let employeeStreet = $('#idStreetInput').val();
    let employeePC = $('#idPostalCodeInput').val();
    let employeeCity = $('#idCityInput').val();
    let employeeIndex = employees.findIndex((element) => { return element.idEmployee === employeeId });

    if (formMode === 'edit') {
        if (employeeFirstname === employees[employeeIndex]['firstname'] &&
            employeeLastname === employees[employeeIndex]['lastname'] &&
            employeeDept === employees[employeeIndex]['deptName'] &&
            employeeStreet === employees[employeeIndex]['addrStreet'] &&
            employeePC === employees[employeeIndex]['addrPostalCode'] &&
            employeeCity === employees[employeeIndex]['addrCity']) {
            addAlert("Aucune modification n'a été effectuée !", 'warning');
        } else {
            $("#modalSaveEdit").modal();
            $("#idSaveEdit").on("click", () => {
                saveEdit(employeeId, employeeFirstname, employeeLastname, employeeDept, employeeStreet, employeePC, employeeCity, 'edit');
            });
        }
    } else {
        if (/^\s+$/.test(employeeFirstname) || /^\s+$/.test(employeeLastname) || /^\s+$/.test(employeeDept) || /^\s+$/.test(employeeStreet) || /^\s+$/.test(employeePC) || /^\s+$/.test(employeeCity)) {
            addAlert("Vous devez renseigner tous les champs !", 'warning');
        } else {
            $("#modalSaveEdit").modal();
            $("#idSaveEdit").on("click", () => {
                saveEdit(employeeId, employeeFirstname, employeeLastname, employeeDept, employeeStreet, employeePC, employeeCity, 'add');
            });
        }
    }
}

function saveEdit(id, firstname, lastname, dept, street, postalCode, city, formMode) {
    let deptId = '0'; // Dummy value for delete mode, otherwise error /!\

    // No need to find the actual dept id if we're deleting
    if (formMode !== 'delete') {
        deptId = departments.find((deptElem) => { return deptElem.deptName === dept})['idDept'];
    }

    // Send data to SQL script
    $.post({
        url: 'employee-edit.php',
        data: {employeeId: id, firstname: firstname, lastname: lastname, dept: deptId, street: street, postalCode: postalCode, city: city, formMode: formMode },
        success: function(html) {
            if (html === 'ok') {
                addAlert("Modifications enregistrées !", 'success');
                loadEmployees(); // Dynamic employees reload
            } else {
                addAlert("Erreur lors de la modification !", 'danger');
            }
        }
    });

    // Needed because click event was registered twice.
    $('#idSaveEdit').unbind();
}

// Load employees from database
function loadEmployees() {
    let employeesDataSelector = $('#idEmployeesData'); // No duplicated selectors ! yay
    employeesDataSelector.empty();

    // Check if new button needs to be added (same as edit)
    if ($('#employeesEdit').length) {
        employeesDataSelector.prepend("<tr>\n" +
            "                <td>N/A</td>\n" +
            "                <td>N/A</td>\n" +
            "                <td>N/A</td>\n" +
            "                <td>N/A</td>\n" +
            "                <td><button id=\"idBtnNewUser\" type=\"button\" class=\"btn btn-primary\" onclick=\"setNewEmployeeTexts()\">New</button></td>\n" +
            "            </tr>")
    }

    // Get JSON formatted array of employees
    $.get({
        url: 'getemployees.php',
        data: null,
        success: function (result) {
            employees = JSON.parse(result);

            employees.forEach(function (employee) {
                // Employee row
                let employeeTr = document.createElement("tr");
                employeeTr.id = "employeeId" + employee['idEmployee'];

                // Employee ID
                let employeeId = document.createElement("td");
                employeeId.innerHTML = employee['idEmployee'];

                // Employee firstname
                let employeeFirstname = document.createElement("td");
                employeeFirstname.innerHTML = employee['firstname'];

                // Employee lastname
                let employeeLastname = document.createElement("td");
                employeeLastname.innerHTML = employee['lastname'];

                // Employee department
                let employeeDept = document.createElement("td");
                employeeDept.innerHTML = employee['deptName'];

                // Edit button (only if employee is admin, which is assumed by the presence or not of the 'new' button)
                let editButton = document.createElement("td");
                if ($('#employeesEdit').length) {
                    editButton.innerHTML = "<button type=\"button\" class=\"btn btn-warning editbtn\" onclick=\"loadData(" + employee['idEmployee'] + ")\">Edit</button>";
                } else {
                    editButton.innerHTML = "";
                }

                // Append columns to row
                employeeTr.appendChild(employeeId);
                employeeTr.appendChild(employeeFirstname);
                employeeTr.appendChild(employeeLastname);
                employeeTr.appendChild(employeeDept);
                employeeTr.appendChild(editButton);

                // Finally append row to table
                employeesDataSelector.append(employeeTr);
            })
        }
    })
}

// Load departments from database
function loadDepartments() {
    $.get({
        url: 'getdepartments.php',
        data: null,
        success: (result) => {
            departments = JSON.parse(result);

            departments.forEach((dept) => {
                $("#idDeptEdit").append("<option value='" + dept['deptName'] + "'>" + dept['deptName'] + "</option>")
            })
        }
    })
}

// Load selected employee data in edit form
function loadData(id) {
    if (formMode !== 'edit') {
        $('#idEditHeader').html('Modification employé');
        $('#idBtnSaveEdit').html("Valider les modifications");
        formMode = 'edit';
    }
    let employeeIndex = employees.findIndex((element) => { return parseInt(element.idEmployee) === id});
    $("#idEmployeeId").val(employees[employeeIndex]['idEmployee']);
    $("#idFirstnameInput").val(employees[employeeIndex]['firstname']);
    $("#idLastnameInput").val(employees[employeeIndex]['lastname']);
    $("#idStreetInput").val(employees[employeeIndex]['addrStreet']);
    $("#idPostalCodeInput").val(employees[employeeIndex]['addrPostalCode']);
    $("#idCityInput").val(employees[employeeIndex]['addrCity']);
    $("#idDeptEdit").val(employees[employeeIndex]['deptName']);
}

// Create Bootstrap alert and append it to edit form
function addAlert(text, type) {
    document.getElementById("employeesEdit").insertAdjacentHTML("beforeend", "<div class=\"alert alert-" + type +" alert-dismissible fade show\" role=\"alert\" id=\"editAlert\">\n" +
        "  <strong>" + text + "</strong>" +
        "  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
        "    <span aria-hidden=\"true\">&times;</span>\n" +
        "  </button>\n" +
        "</div>");
}
