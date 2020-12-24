function readURL(input, imgDescriptionPreID) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = (e) => {
            $('#' + imgDescriptionPreID).attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function loadFrontendImage(imgDescriptionID, imgDescriptionPreTitleID, imgDescriptionPreID, btnUpdateImage) {
    var image = document.getElementById(imgDescriptionID);
    //image.className = 'attachment_upload';
    image.onchange = function() {
        document.getElementById(imgDescriptionPreTitleID).value = this.value.substring(12);
        document.getElementById(btnUpdateImage).disabled = false;
    };

    $('#' + imgDescriptionID).change(function() {
        readURL(this, imgDescriptionPreID);
    });
}