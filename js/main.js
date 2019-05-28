/*
 *  Author      : Laszlo DINDELEUX / I.FA-P2A
 *  Project     : hrpanel
 *  Version     : 1.0.0
 *  File        : main.js
 *  Description : Contains required functions for both login and register pages
 */

/**
 * Gets values of form inputs, and queries the check credentials PHP script.
 * @returns {void} Returns nothing.
 */
function checkCredentials() {
    // Get data
    let email = $('#idEmailInput').val();
    let password = $('#idPasswordInput').val();

    // Remove previous alerts
    $('#idAlert').remove();

    // Query register script
    $.post({
        url: 'checkcreds.php',
        data: {email: email, password: password},
        success: (result) => {
            if (result === "ok") {
                document.location.assign("users.php");
            } else {
                $('#middleWrapper').prepend(result);
            }
        }
    })
}

/**
 * Gets values of form inputs, and queries the register user PHP script.
 * @return {void} Returns nothing.
 */
function registerNewUser() {
    // Get data
    let email = $('#idEmailInput').val();
    let password = $('#idPasswordInput').val();
    let confirmPassword = $('#idConfirmPasswordInput').val();

    // Remove previous alerts
    $('#idAlert').remove();

    // Query register script
    $.post({
        url: 'registeruser.php',
        data: {email: email, password: password, confirmPassword: confirmPassword},
        success: (result) => {
            if (result === 'ok') {
                document.location.assign('users.php')
            } else {
                $('#middleWrapper').prepend(result);
            }
        }
    })
}