$(document).ready(function() {
    loadPreviewImage('avatar', null, 'avatar-preview', null);
    checkPass();

})

checkPass = function() {
    $('#retypePass').bind('keyup', function() {
        if ($('#retypePass').val() != $('#newPass').val()) {
            $('#errorPassRetype').html('<div class="alert alert-danger">Mật khẩu mới không khớp!</div>')
            $('#btnChangePass').attr("disabled", true);
        } else {
            $('#errorPassRetype').html('')
            $('#btnChangePass').attr("disabled", false);
        }
    })
}