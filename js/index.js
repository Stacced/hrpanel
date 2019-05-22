/*

INDEX PAGE FUNCTIONS
-> checkCredentials() => Sends AJAX request with email and password as parameters

*/
function checkCredentials() {
    // Getting data
    let email = $('#idEmailInput').val();
    let password = $('#idPasswordInput').val();

    // Removing previous alerts
    $('#idAlert').remove();

    // Ajax POST
    $.post({
        url: 'checkcreds.php',
        data: {email: email, password: password},
        success: function (result) {
            if (result === "ok") {
                document.location.assign("users.php");
            } else {
                $('#middleWrapper').prepend(result);
            }
        }
    })
};