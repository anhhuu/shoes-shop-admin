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

filterSubmitAJAX = () => {
    $("form#formFilterProducts").submit(function(e) {
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

        setTimeout(function() {
            $.ajax({
                url: '/api/products',
                type: 'get',
                data: query,
                success: function(result) {
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
        $('#priceUnit').on('change', function() {
            if ($('#vndUnitOption').is(':selected')) {
                $('#vndUnitRange').attr("hidden", false);
                $('#vndUnitRange').attr("disabled", false);
                $('#usdUnitRange').attr("hidden", true);
                $('#usdUnitRange').attr("disabled", true);
            } else {
                $('#vndUnitRange').attr("hidden", true);
                $('#vndUnitRange').attr("disabled", true);
                $('#usdUnitRange').attr("hidden", false);
                $('#usdUnitRange').attr("disabled", false);
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