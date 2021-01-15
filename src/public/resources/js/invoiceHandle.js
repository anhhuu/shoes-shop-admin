const getInvoice =  function (invoiceID){
    $.get('/api/users/invoices/'+invoiceID, function (data){

        let html=``;

        data.invoice_items.map((item,index)=>{
            html+=`    <tr>
                            <th scope="row">${index+1}</th>
                            <td class="text-center"><a href="/products/${item.product.product_url}" 
                                target="_blank"><img src="${item.product.image_show_url}" 
                                alt="" width="100" height="100"></a></td>
                            <td class="text-center"><a href="/products/${item.product.product_url}" 
                            target="_blank">${item.product.name}</a></td>
                            
                            <td class="text-center">${item.size}</td>
                            <td class="text-center">${item.qty}</td>
                            <td class="text-center">${new Intl.NumberFormat('vi-VN',
                { style: 'currency', currency: 'VND' })
                .format(item.product.price.price_value*(1-item.product.discount))}
                            </td>
                            <td class="text-center"><p>${new Intl.NumberFormat('vi-VN',
                { style: 'currency', currency: 'VND' })
                .format(item.qty*item.product.price.price_value*(1-item.product.discount))}</p>
                            </td>
                        </tr>
                        `
        })

        $('#body-invoice-detail').html(html)
        $('#id-invoice-input').val(invoiceID);

    })
}

const clearModal = function (){
    $('#body-invoice-detail').html('');
}



$('#form-update-status').submit(function (event){

    const status = $('[name = "status"]:checked').val();
    console.log(status)
    const invoiceid = $('#id-invoice-input').val();

    $.ajax({
            url: '/api/users/invoices/'+invoiceid,
            data: {status: status},
            type:'PUT',
            success: function (result) {

                event.preventDefault();
            }
        }
    )


})