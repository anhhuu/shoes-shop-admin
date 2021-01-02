readURL = (input, imgDescriptionPreID) => {
    if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
            $('#' + imgDescriptionPreID).attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

loadPreviewImage = (imgDescriptionID, imgDescriptionPreTitleID, imgDescriptionPreID, btnUpdateImage) => {
    let image = document.getElementById(imgDescriptionID);
    //image.className = 'attachment_upload';
    if (image) {
        image.onchange = function() {
            document.getElementById(imgDescriptionPreTitleID).value = this.value.substring(12);
            document.getElementById(btnUpdateImage).disabled = false;
        };
    }

    $('#' + imgDescriptionID).change(function() {
        readURL(this, imgDescriptionPreID);
    });
}