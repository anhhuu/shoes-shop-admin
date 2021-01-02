checkIsDeletedSizeAJAX = () => {
    $('#newSizeSelected').on('change', () => {
        $('#btnConfirmToCreateNewSize').prop('disabled', true);
        if ($('#textMessageOnCreateNewSize p')) {
            $('#textMessageOnCreateNewSize p').remove()
        }

        if ($('#textMessageOnCreateNewSize input')) {
            $('#textMessageOnCreateNewSize input').remove()
        }

        $('#amountInput').val('');
        $('#remainingAmountInput').val('');

        $('#newSizeSelected option').each((index, element) => {
            console.log($(element));
            if ($(element).is(':selected') && $(element).val() != '') {

                $.ajax({
                    type: 'GET',
                    url: '/api/products/is-deleted-size',
                    data: {
                        size_id: element.value,
                        id: $('#productID').val()
                    },
                    success: function(result) {
                        $('#btnConfirmToCreateNewSize').prop('disabled',
                            false);
                        if (result != '') {
                            let text =
                                ' Hệ thống phát hiện size bạn chọn đã bị xoá với các thuộc tính trước khi xoá là: <br>' +
                                ` - Tổng số lượng: ${result.amount} <br>` +
                                ` - Số lượng còn lại: ${result.remaining_amount} <br>` +
                                'Chỉnh sửa thông tin tương ứng, hoặc giữ nguyên để khôi phục.';

                            $('#textMessageOnCreateNewSize').append('<p>' + text + '</p>');
                            $('#textMessageOnCreateNewSize').append('<input type="text" name="isRestore" hidden value="true">');
                            $('#amountInput').val(result.amount);
                            $('#remainingAmountInput').val(result.remaining_amount);
                        }
                    }
                });
            }
        })
    });
}

$(document).ready(() => {

    //url with #tab
    var url = document.location.toString();
    if (url.match('#')) {
        $('.nav-tabs a[href="#' + url.split('#')[1] + '"]').tab('show');
    }

    //load image preview
    loadPreviewImage('img-detail', 'img-detail-preview-title', 'img-detail-preview', 'btnUpdateImageDetail');
    loadPreviewImage('img-show', 'img-show-preview-title', 'img-show-preview', 'btnUpdateImageShow');

    //check and show message if the product detail is deleted => restore
    checkIsDeletedSizeAJAX();
});