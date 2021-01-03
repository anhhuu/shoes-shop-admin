isExistByName = () => {
    let timer, value;
    $('#txtBrandName').bind('keyup', (event) => {
        if ($('#messageForExistName p')) {
            $('#messageForExistName p').remove();
        }
        clearTimeout(timer);
        let str = $(event.currentTarget).val();
        if (str.length > 3 && value != str) {
            timer = setTimeout(() => {
                $.ajax({
                    type: 'GET',
                    url: '/api/brands/is-name-exist',
                    data: {
                        name: $(event.currentTarget).val(),
                    },
                    success: result => {
                        if (result.is_exist) {
                            $('#btnCreateBrand').prop('disabled', true);
                            $('#messageForExistName').append('<p>Tên thương hiệu đã tồn tại</p>')
                        }
                    }
                })
                checkExistErrorMessage();
            }, 500);
        } else {
            $('#btnCreateBrand').prop('disabled', true);
            $('#messageForExistName').append('<p>Tên thương hiệu phải lớn hơn 3 ký tự</p>')
        }
        checkExistErrorMessage();
    });
}

isExistByURL = () => {
    let timer, value;
    $('#txtBrandURL').bind('keyup', (event) => {
        if ($('#messageForExistURL p')) {
            $('#messageForExistURL p').remove();
        }
        clearTimeout(timer);
        let str = $(event.currentTarget).val();
        if (str.length > 3 && value != str) {
            timer = setTimeout(() => {
                $.ajax({
                    type: 'GET',
                    url: '/api/brands/is-url-exist',
                    data: {
                        url: $(event.currentTarget).val(),
                    },
                    success: result => {
                        if (result.is_exist) {
                            $('#btnCreateBrand').prop('disabled', true);
                            $('#messageForExistURL').append('<p>URL title đã tồn tại</p>')
                        }
                    }
                });
                checkExistErrorMessage();
            }, 500);
        } else {
            $('#btnCreateBrand').prop('disabled', true);
            $('#messageForExistURL').append('<p>URL title phải lớn hơn 3 ký tự</p>')
        }
        checkExistErrorMessage();
    });
}

checkExistErrorMessage = () => {
    if (!$('#messageForExistURL p').length && !$('#messageForExistURL p').length) {
        $('#btnCreateBrand').prop('disabled', false);
    } else {
        $('#btnCreateBrand').prop('disabled', true);
    }
}

$(document).ready(function() {
    isExistByName();
    isExistByURL();
});