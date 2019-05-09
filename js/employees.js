let employees = [];
let departments = [];
let formMode = null;

$(document).ready(() => {
    loadEmployees();
    loadDepartments();
});

function setNewUserTexts() {
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

function loadEmployees() {
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
                employeeDept.innerHTML = employee['idDept'];

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
                $('#idEmployeesData').append(employeeTr);
            })
        }
    })
}

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

function loadData(id) {
    if (formMode !== 'edit') {
        $('#idEditHeader').html('Modification utilisateur');
        $('#idBtnSaveEdit').html("Valider les modifications");
        formMode = 'edit';
    }
    let employeeIndex = employees.findIndex((element) => { return parseInt(element.idEmployee) === id});
    $("#idUserId").val(employees[employeeIndex]['idEmployee']);
    $("#idFirstnameInput").val(employees[employeeIndex]['firstname']);
    $("#idLastnameInput").val(employees[employeeIndex]['lastname']);
    $("#idStreetInput").val(employees[employeeIndex]['addrStreet']);
    $("#idPostalCodeInput").val(employees[employeeIndex]['addrPostalCode']);
    $("#idCityInput").val(employees[employeeIndex]['addrCity']);
    $("#idDeptEdit").val(employees[employeeIndex]['deptName']);
}