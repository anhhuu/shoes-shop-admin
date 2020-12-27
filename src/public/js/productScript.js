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


function dropdownCheckboxScript(dropdownMenuID, textID) {
    let options = [];
    let $dropdownDiv = $('#' + dropdownMenuID + ' a')
    let $inputCheckbox = $dropdownDiv.find('input');

    $inputCheckbox.each((i, val) => {
        if ($(val).is(':checked')) {
            options.push($(val).parent().text().replace(/\s/g, ''))
        }
    });

    if (options.length) {
        $('#' + textID).text(options.join(', '));
    }

    $('#' + dropdownMenuID + ' a').on('click', function(event) {
        let $target = $(event.currentTarget),
            val = $target.text(),
            $inp = $target.find('input'),
            idx;

        if ((idx = options.indexOf(val.replace(/\s/g, ''))) > -1) {
            options.splice(idx, 1);
            $('#' + textID).text(options.join(', '));
            setTimeout(function() {
                $inp.prop('checked', false)
            }, 0);
        } else {
            options.push(val.replace(/\s/g, ''));
            $('#' + textID).text(options.join(', '));
            setTimeout(function() {
                $inp.prop('checked', true)
            }, 0);
        }

        if (!options.length) {
            $('#' + textID).text('Tất cả');
        }
        $(event.target).blur();

        console.log(options);
        return false;
    });
}