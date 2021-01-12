loadBrandSizesAJAX = () => {
    $('#brand_id').on('change', event => {
        $.ajax({
            type: 'GET',
            url: '/api/sizes',
            data: {
                brand_id: $(event.currentTarget).val()
            },
            success: sizes => {
                const sizesElement = $('#sizes');
                sizesElement.empty();
                sizesElement.append(
                    `<input type="text" id="totalSizes" value="${sizes.length}" disabled hidden>`
                )
                $.each(sizes, (index, value) => {
                    let sizesListElement =
                        '<div class="row d-flex justify-content-center">' +
                        '<div class="input-group mb-3 col-md-8">' +
                        '<div class="input-group-prepend">' +
                        '<div class="input-group-text">' +
                        `<input type="checkbox" name="sizes" id="checkboxSize${index + 1}" value="${value._id}">` +
                        '</div>' +
                        '</div>' +
                        '<div class="input-group-prepend col-md-5" style="padding: 0;">' +
                        `<span class="input-group-text" id="inputGroupPrepend" style="width: 100%;">${value.text}</span>` +
                        '</div>' +
                        `<input type="text" class="form-control" id="amount${index + 1}" name="amount" placeholder="Tổng số" disabled>` +
                        `<input type="text" class="form-control" id="remaining_amount${index + 1}" name="remaining_amount" + placeholder="Số lượng còn lại" disabled>` +
                        '</div>' +
                        '</div>'
                    sizesElement.append(sizesListElement);
                });
                enableOnCheckedSize();
                checkDiscount();
                checkPrice();
                checkRemainingAmount();
                checkAmount();
            }
        })
    })
}

enableOnCheckedSize = () => {
    let totalSizes = $('#totalSizes').val();
    $('input:checkbox').prop('checked', false);
    for (let i = 0; i < totalSizes; i++) {
        $('#checkboxSize' + String(i + 1)).on('change', function() {
            if (this.checked === true) {
                //console.log(totalSizes);
                //console.log(i);
                $('#amount' + String(i + 1)).attr('disabled', false);
                $('#amount' + String(i + 1)).prop('required', true);
                $('#remaining_amount' + String(i + 1)).attr('disabled', false);
                $('#remaining_amount' + String(i + 1)).prop('required', true);
            } else {
                $('#amount' + String(i + 1)).attr('disabled', true);
                $('#amount' + String(i + 1)).prop('required', false);
                $('#remaining_amount' + String(i + 1)).attr('disabled', true);
                $('#remaining_amount' + String(i + 1)).prop('required', false);
            }
        })
    }
}


checkDiscount = () => {
    $('input[name = "discount"]').bind('keyup', (event) => {
        const discountInput = $(event.currentTarget).val();
        if (isNaN(discountInput) || discountInput === '' || +discountInput < 0 || +discountInput > 99) {
            $(event.currentTarget).addClass('is-invalid');
            $('#errDiscount').text('Discount phải là số dương và < 100');
            $('#btnCreate').attr('disabled', true);
        } else {
            $(event.currentTarget).removeClass('is-invalid');
            $(event.currentTarget).addClass('is-valid');
            $('#errDiscount').text('');
            $('#btnCreate').attr('disabled', false);
        }
    })
}

checkPrice = () => {
    $('input[name = "price_value"]').bind('keyup', (event) => {
        const priceInput = $(event.currentTarget).val();
        if (isNaN(priceInput) || +priceInput < 0 || priceInput === '') {
            $(event.currentTarget).addClass('is-invalid');
            $('#errPrice').text('Price phải là số dương');
            $('#btnCreate').attr('disabled', true);
        } else {
            $(event.currentTarget).removeClass('is-invalid');
            $(event.currentTarget).addClass('is-valid');
            $('#errPrice').text('');
            $('#btnCreate').attr('disabled', false);
        }
    })
}

checkRemainingAmount = () => {
    $('input[name = "remaining_amount"]').bind('keyup', (event) => {
        console.log('x');
        const sizeInput = $(event.currentTarget).val();
        if (isNaN(sizeInput) || +sizeInput < 0) {
            $(event.currentTarget).addClass('is-invalid');
            $('#btnCreate').attr('disabled', true);
        } else {
            $(event.currentTarget).removeClass('is-invalid');
            $(event.currentTarget).addClass('is-valid');
            $('#btnCreate').attr('disabled', false);
        }
    })
}
checkAmount = () => {
    $('input[name = "amount"]').bind('keyup', (event) => {
        console.log('x');
        const sizeInput = $(event.currentTarget).val();
        if (isNaN(sizeInput) || +sizeInput < 0) {
            $(event.currentTarget).addClass('is-invalid');
            $('#btnCreate').attr('disabled', true);
        } else {
            $(event.currentTarget).removeClass('is-invalid');
            $(event.currentTarget).addClass('is-valid');
            $('#btnCreate').attr('disabled', false);
        }
    })
}

$(document).ready(() => {

    loadPreviewImage('img-show', 'img-show-preview-title', 'img-show-preview', 'btnUpdateImageShow');

    for (let i = 0; i < 4; i++) {
        loadPreviewImage('img-detail' + String(i + 1), 'img-detail-preview-title' + String(i + 1),
            'img-detail-preview' + String(i + 1),
            'btnUpdateImageDetail' + String(i + 1));
    }

    (() => {
        $('#img-show').on('change', (event) => {
            console.log($(event.currentTarget).val().substring(12));
            $('#img_show_name').val($(event.currentTarget).val().substring(12));
        })
    })()

    loadBrandSizesAJAX();
    enableOnCheckedSize();
    checkDiscount();
    checkPrice();
    checkRemainingAmount();
    checkAmount();
});