const url = 'step4.php?invoices';

fetch(url, {
  method: 'GET',
})
  .then(response => response.json())
  .then(data => {

    console.log(data);
    // let invoiceList = '<ul id="invoiceList" class="list-group mb-3">';
    // for (let invoice of data) {

    //     let invoiceListItems = 
    //     `<li class="list-group-item d-flex justify-content-between lh-sm" data-invoice-json="${encodeURIComponent(JSON.stringify(invoice))}">
        
    //         <div class="selectInvoice form-check form-check-inline">
    //             <input class="form-check-input" type="checkbox" value="" name="${invoice.number}"
    //                     aria-label="Select invoice">
    //         </div>
    //         <div class="invoiceInfo flex-grow-1">
    //             <div class="d-flex flex-row align-items-center">
    //                 <h6 class="my-0">${invoice.number}</h6>
    //                 <small class="invoiceDays ms-2 badge badge rounded-pill">${invoice.days}</small>
    //             </div>
    //             <small class="invoiceCompany text-muted">${invoice.company}</small>
    //         </div>
    //             <span class="invoiceAmount text-muted">${invoice.amount}</span>
    //     </li>`

    //     invoiceList += invoiceListItems }
        
    });