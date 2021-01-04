showListCheckedOnDropdownCheckbox = (dropdownMenuID, textID) => {
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

    $('#' + dropdownMenuID + ' a').on('click', event => {
        let $target = $(event.currentTarget),
            val = $target.text(),
            $inp = $target.find('input'),
            idx;

        if ((idx = options.indexOf(val.replace(/\s/g, ''))) > -1) {
            options.splice(idx, 1);
            $('#' + textID).text(options.join(', '));
            setTimeout(() => {
                $inp.prop('checked', false)
            }, 0);
        } else {
            options.push(val.replace(/\s/g, ''));
            $('#' + textID).text(options.join(', '));
            setTimeout(() => {
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

filterSubmitAJAX = () => {
    $("form#formFilterProducts").submit(e => {
        e.preventDefault();
        let query = $('form#formFilterProducts').serialize();
        let loading =
            '<div id="productsTableShow">' +
            '<div class="table-responsive">' +
            '<div class="d-flex justify-content-center">' +
            '<div class="spinner-border text-danger" role="status">' +
            '<span class="sr-only">Loading...</span>' +
            '</div> </div> </div> </div>'

        $('#productsTableShow').replaceWith(loading);

        setTimeout(() => {
            $.ajax({
                url: '/api/products',
                type: 'get',
                data: query,
                success: result => {
                    $('#productsTableShow').replaceWith(result);
                    window.history.pushState('', 'Tất cả sản phẩm', '/products?' + query);
                }
            });
        }, 700)
    })
}

$(document).ready(() => {
    //dropdown checkbox
    showListCheckedOnDropdownCheckbox("brandDropdown", "brandText");
    showListCheckedOnDropdownCheckbox("categoryDropdown", "categoryText");

    //show/hidden price unselected
    (() => {
        $('#priceCurrency').on('change', () => {
            if ($('#vndCurrencyOption').is(':selected')) {
                $('#vndCurrencyRange').attr("hidden", false);
                $('#vndCurrencyRange').attr("disabled", false);
                $('#usdCurrencyRange').attr("hidden", true);
                $('#usdCurrencyRange').attr("disabled", true);
            } else {
                $('#vndCurrencyRange').attr("hidden", true);
                $('#vndCurrencyRange').attr("disabled", true);
                $('#usdCurrencyRange').attr("hidden", false);
                $('#usdCurrencyRange').attr("disabled", false);
            }
        })
    })();

    //paginating event
    (() => {
        $(document).on('click', '.page-item', (event) => {
            if ($(event.currentTarget).find('button').attr('id') == 'pageStart') {
                $(event.currentTarget).append('<input type="text" name="page" value=' + 1 + ' hidden>');
            } else if ($(event.currentTarget).find('button').attr('id') == 'pageEnd') {
                $(event.currentTarget).append('<input type="text" name="page" value="' + $('#numberOfPage').val() +
                    '"hidden>');
            } else {
                $(event.currentTarget).append('<input type="text" name="page" value=' + $(event.currentTarget).text() + ' hidden>');
            }
            $('form#formFilterProducts').submit();
        })
    })();

    filterSubmitAJAX();
});