let employees = [];
let formMode = null;

$(document).ready(() => {
    loadEmployees();
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

                // Employee name
                let employeeName = document.createElement("td");
                employeeName.innerHTML = employee['firstname'] + employee['lastname'];

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
                employeeTr.appendChild(employeeName);
                employeeTr.appendChild(employeeDept);
                employeeTr.appendChild(editButton);

                // Finally append row to table
                $('#idEmployeesData').append(employeeTr);
            })
        }
    })
}