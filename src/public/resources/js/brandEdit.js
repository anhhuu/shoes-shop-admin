isVNSizeExistAJAX = () => {
    $('#newVNSizeSelected').on('change', () => {
        $('#newVNSizeSelected option').each((index, element) => {
            if ($('#textMessageVNSizeExist p')) {
                $('#textMessageVNSizeExist p').remove()
            }
            if ($(element).is(':selected') && $(element).val() != '') {
                $.ajax({
                    type: 'GET',
                    url: '/api/sizes/is-VNSize-exist',
                    data: {
                        VN_size: element.value,
                        brand_id: $('#brand_id').val()
                    },
                    success: result => {
                        if (result.is_exist == true) {
                            $('#btnConfirmToCreateNewSize').prop('disabled', true);
                            $('#textMessageVNSizeExist').append('<p> - VN Size đã tồn tại</p>');
                        }
                    }
                });
            }
        });
        checkExistSize();
    });
}

isUSSizeExistAJAX = () => {
    $('#newUSSizeSelected').on('change', () => {
        if ($('#textMessageUSSizeExist p')) {
            $('#textMessageUSSizeExist p').remove()
        }
        $('#newUSSizeSelected option').each((index, element) => {
            if ($(element).is(':selected') && $(element).val() != '') {
                $.ajax({
                    type: 'GET',
                    url: '/api/sizes/is-USSize-exist',
                    data: {
                        US_size: element.value,
                        brand_id: $('#brand_id').val()
                    },
                    success: result => {
                        if (result.is_exist == true) {
                            $('#btnConfirmToCreateNewSize').prop('disabled', true);
                            $('#textMessageUSSizeExist').append('<p> - US Size đã tồn tại</p>');
                        }
                    }
                });
            }
        });
        checkExistSize();
    });
}

isCMSizeExistAJAX = () => {
    $('#newCMSizeSelected').on('change', () => {
        if ($('#textMessageCMSizeExist p')) {
            $('#textMessageCMSizeExist p').remove()
        }
        $('#newCMSizeSelected option').each((index, element) => {
            if ($(element).is(':selected') && $(element).val() != '') {
                $.ajax({
                    type: 'GET',
                    url: '/api/sizes/is-CMSize-exist',
                    data: {
                        CM_size: element.value,
                        brand_id: $('#brand_id').val()
                    },
                    success: result => {
                        if (result.is_exist == true) {
                            $('#btnConfirmToCreateNewSize').prop('disabled', true);
                            $('#textMessageCMSizeExist').append('<p> - CM Size đã tồn tại</p>');
                        }
                    }
                });
            }
        });
        checkExistSize();
    });
}

checkExistSize = () => {
    if (!$('#textMessageVNSizeExist p').length && $('#newVNSizeSelected option:selected').val() != '' &&
        !$('#textMessageUSSizeExist p').length && $('#newUSSizeSelected option:selected').val() != '' &&
        !$('#textMessageCMSizeExist p').length && $('#newCMSizeSelected option:selected').val() != '') {
        $('#btnConfirmToCreateNewSize').prop('disabled', false);
    } else {
        $('#btnConfirmToCreateNewSize').prop('disabled', true);
    }
}

$(document).ready(() => {
    isVNSizeExistAJAX();
    isUSSizeExistAJAX();
    isCMSizeExistAJAX();
    //checkExistSize();
});