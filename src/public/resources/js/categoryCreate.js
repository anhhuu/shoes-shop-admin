isExistByName = () => {
    let timer, value;
    $('#txtCategoryName').bind('keyup', (event) => {
        if ($('#messageForExistName p')) {
            $('#messageForExistName p').remove();
        }
        clearTimeout(timer);
        let str = $(event.currentTarget).val();
        if (str.length > 3 && value != str) {
            timer = setTimeout(() => {
                $.ajax({
                    type: 'GET',
                    url: '/api/categories/is-name-exist',
                    data: {
                        name: $(event.currentTarget).val(),
                    },
                    success: result => {
                        if (result.is_exist) {
                            $('#btnCreateCategory').prop('disabled', true);
                            $('#messageForExistName').append('<p>Tên thương hiệu đã tồn tại</p>')
                        }
                    }
                })
                checkExistErrorMessage();
            }, 500);
        } else {
            $('#btnCreateCategory').prop('disabled', true);
            $('#messageForExistName').append('<p>Tên thương hiệu phải lớn hơn 3 ký tự</p>')
        }
        checkExistErrorMessage();
    });
}

isExistByURL = () => {
    let timer, value;
    $('#txtCategoryURL').bind('keyup', (event) => {
        if ($('#messageForExistURL p')) {
            $('#messageForExistURL p').remove();
        }
        console.log('RUN');
        clearTimeout(timer);
        let str = $(event.currentTarget).val();
        if (str.length > 3 && value != str) {
            timer = setTimeout(() => {
                $.ajax({
                    type: 'GET',
                    url: '/api/categories/is-url-exist',
                    data: {
                        url: $(event.currentTarget).val(),
                    },
                    success: result => {
                        if (result.is_exist) {
                            $('#btnCreateCategory').prop('disabled', true);
                            $('#messageForExistURL').append('<p>URL title đã tồn tại</p>')
                        }
                    }
                });
                checkExistErrorMessage();
            }, 500);
        } else {
            $('#btnCreateCategory').prop('disabled', true);
            $('#messageForExistURL').append('<p>URL title phải lớn hơn 3 ký tự</p>')
        }
        checkExistErrorMessage();
    });
}

checkExistErrorMessage = () => {
    if (!$('#messageForExistURL p').length && !$('#messageForExistURL p').length) {
        $('#btnCreateCategory').prop('disabled', false);
    } else {
        $('#btnCreateCategory').prop('disabled', true);
    }
}

$(document).ready(function() {
    isExistByName();
    isExistByURL();
});