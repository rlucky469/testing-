const searchBtn = document.querySelector("#search");
const searchBox = document.querySelector("#searchBOx");
const error = document.querySelector("#error");
const content = document.querySelector("#content");


const paymentMode = ['MoneyGram', 'International Bank Transfer', 'Western Union', 'Check Deposit']



searchBtn.addEventListener("click", function () {
    getData()
});

searchBox.addEventListener('keypress', function (e) {

  if (e.key === 'Enter') {
  
   getData()

  }
})
  


function getData(){
  if (searchBox.value) {
    error.innerHTML = "";
    
    content.innerHTML = `
    <div class="text-center mt-3">
    <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
    </div>
    `;

    fetch("https://ang-crs.fundsforngospremium.com/api/Foundation/GetInvoiceDetail?invoiceId=" + searchBox.value)
      .then((response) => response.json())
      .then((json) => {
        
        if(json.sucessCode === 1){
   
            renderData(json.result);
        }
        else {
            content.innerHTML = "<p></p>"  
            error.innerHTML =`<p> ${json.message} </p>`;
        }
      })
      .catch((err) => {
        content.innerHTML = "<p></p>"  
        error.innerHTML = `<p> ${err} </p>`;
      });
  } else {

    error.innerHTML = "<p>This value is required </p>";
  }
}

function printInvoice(){
    window.print();
}

const renderData = (invoice) => {
  document.title = invoice.invoiceNumber.replace(/\//g, '-')
    content.innerHTML = content.innerHTML = `
    <section class="invoice-detail">
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="card-body">
                    <div class="invoice">
                        
                        <div class="align-items-center py-1 border-bottom my-2 row">
                            <div  class="col-sm-6">
                            <img
                                    src="./logo.png"
                                    class="img-fluid mb-2" alt="logo"></div>
                            <div  class="text-end col-sm-6">
                                <h3 class="">INVOICE </h3>
                            </div>
                        </div>
                        <div class="row invoice-info m-b-3 pt-2 row">
                            <div class="col-sm-4">
                            ${
                              invoice.country === "India"
                                ? `<address >
                            <strong>FUNDS FOR NGOS INDIA PVT. LTD.</strong>
                            <span class="d-block">
                                Corporate Office: Ground Floor, 21, IT Park, Sahastradhara
                                Road,Dehradun
                                - 248001, Uttarakhand, India
                            </span>
                            <span class="d-block"> <strong>GSTIN Number:</strong> 05AACCF3955E1ZV
                            </span>
                            <span class="d-block"><strong>Email:</strong> support@fundsforngos.org
                            </span>
                        </address>`
                                : ""
                            }

                                ${
                                  invoice.country !== "India"
                                    ? `<address id="lbl_CompanyAddress" runat="server">
                                <strong>FUNDSFORNGOS, LLC</strong>
                                    <span class="d-block">140 Broadway</span>
                                    <span class="d-block">
                                        46th Floor
                                    </span>
                                    <span class="d-block"> New York, NY 10005 </span>
                                <span  class="d-block"> United States </span><strong>Tel: </strong> +1 855 666 2396
                                </address>`
                                    : ""
                                }
                            </div>
                            <div class="col-sm-5">
                                <address id="lbl_MemberAddress" runat="server">
                                <strong class="d-block">${
                                  invoice.firstName 
                                }
                                ${invoice?.lastName} </strong>
                                <p class="m-0"> ${invoice.address}</p>
                                <p class="m-0"> ${invoice.cityname} ${
    invoice.country
  }
                                    ${invoice.zipcode}</p>
                                <p class="m-0"> <strong>Ph: </strong>${
                                  invoice.phoneNumber
                                } </p>
                                <p class="m-0"> <strong>Email: </strong>${
                                  invoice.emailAddress
                                }
                                </p>
                                ${
                                  invoice.country === "India" &&
                                  invoice.gstbenefit === "Yes"
                                    ? `<div>
                                    <p class="m-0"> <strong>GSTIN Name:
                                        </strong>${invoice?.gstregistrantName} </p>
                                    <p class="m-0"> <strong>GSTIN Number:
                                        </strong>${invoice?.gstinnumber} </p>
                                    <p> <strong>State: </strong>${invoice?.statename} </p>
                                </div>`
                                    : ""
                                }
                                </address>
                            </div>
                            <div class="col-sm-3">
                                <address id="lbl_Invoice'" runat="server">
                                <p> <strong> Invoice# </strong> ${
                                  invoice.invoiceNumber
                                } </p>
                                <p> <strong> Invoice Date:</strong> ${
                                  invoice.invoiceDate
                                } </p>
                                <p> <strong> Amount: </strong>
                                    ${invoice.netInvoiceAmount.toFixed(2)}
                                    ${invoice.currency} </p>
                                </address>
                            </div>
                        </div>
                        <div class="row">
                            <div class=" table-responsive col-md-12">
                                <table class="table table-bordered border">
                                    <thead>
                                        <tr class="table-active font-weight-bold">
                                            <th>Item</th>
                                            <th>Description</th>
                                            <th> Plan duration</th>
                                            <th>Unit Cost </th>
                                            <th>Qty</th>
                                            <th>Line Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="border-1">
                                            <td>Subscription</td>
                                            <td><span class="d-block">${
                                              invoice.planDuration +
                                              " " +
                                              invoice.planDurationUnit
                                            } Subscription to </span><a
                                                    target="_blank" rel="noopener noreferrer"
                                                    href="https://fundsforngospremium.com/"
                                                    class="d-block">fundsforNGOs Premium membership </a>${
                                                      invoice.planName
                                                    }
                                            </td>
                                            <td> <span class="d-block"> 
                                                ${invoice.planActivationDate} to
                                                ${
                                                  invoice.planExpiryDate
                                                } </span> Premium Standard Membership
                                            </td>
                                            <td>${invoice.planAmount.toFixed(
                                              2
                                            )} </td>
                                            <td> 1 </td>
                                            <td>${invoice.planAmount.toFixed(2 )} </td>
                                        </tr>
                                        ${
                                          invoice.country !== "India" &&  paymentMode.includes(invoice.paymentMode.trim())
                                             &&
                                          invoice.miscAdd > 0
                                            ? `<tr style=" border-top: '1px solid gainsboro'" className="border-1">
                                                        <td>Bank Charges </td>
                                                        <td>International Wire Transfer Fee </td>
                                                        <td>-</td>
                                                        <td>${invoice.miscAdd.toFixed(
                                                          2
                                                        )} </td>
                                                        <td> </td>
                                                        <td>${invoice.miscAdd.toFixed(
                                                          2
                                                        )} </td>
                                                    </tr>`
                                            : ""
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-9 col-sm-6">
                                <p class="mr-4"><strong>Payment Method:</strong>  ${
                                  invoice.paymentMode
                                }</p>
                            
                            </div>
                            <div class="col-md-3 col-sm-6">
                                <div class="table-responsive details-table">
                                    <table class="table">
                                        <tbody class="">
                                            <tr>
                                                <th><strong>Total</strong></th>
                                                <td> ${invoice.netTaxableAmount.toFixed(
                                                  2
                                                )} ${invoice.currency}</td>
                                            </tr>
                                           ${
                                            invoice.country === "India" &&  invoice.gstbenefit === "Yes"
                                               ? `
                                           <tr>
                                           <th class="border-0"><strong>CGST @
                                                   ${
                                                     invoice.cgstpercent
                                                   }%</strong></th>
                                           <td class="border-0">
                                               ${invoice.cgstamount.toFixed(2)}
                                               ${invoice.currency}</td>
                                       </tr>
                                       <tr>
                                           <th class="border-0"><strong>SGST @
                                                   ${
                                                     invoice.sgstpercent
                                                   } %</strong></th>
                                           <td class="border-0">
                                               ${invoice.sgstamount.toFixed(2)}
                                               ${invoice.currency}</td>
                                       </tr>
                                       <tr>
                                           <th class="border-0"><strong>IGST @
                                                   ${
                                                     invoice.igstpercent
                                                   } %</strong></th>
                                           <td class="border-0">
                                               ${invoice.igstamount.toFixed(
                                                 2
                                               )}
                                               ${invoice.currency}</td>
                                       </tr>
                                       <tr>
                                           <th><strong> Total GST </strong> </th>
                                           <td>${invoice.totalGst.toFixed(
                                             2
                                           )}
                                               ${invoice.currency} 
                                           </td>
                                       </tr>`
                                               : ""
                                           }
                                            <tr>
                                            <th><strong>Net Amount </strong> </th>
                                            <td>${invoice.netInvoiceAmount.toFixed(
                                              2
                                            )}
                                            ${invoice.currency}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class=" print-footer row ">
                            <div class="col-sm-12 ">
                            ${
                              paymentMode.includes(invoice.paymentMode.trim()) 
                                ? `<small>
                            <p class="mb-3"> <strong>RECEIVING BANK: Bank of America
                                </strong><br>FOR
                                THE ACCOUNT OF: FUNDSFORNGOS LLC<br>ROUTING OR ABA #: 026009593SWIFT
                                CODE: BOFAUS3NACCOUNT #: 375023031862<br>REFERENCE: Name of the
                                Sending
                                Organization, Invoice no. (if applicable)<br>Please insert the
                                purpose
                                of sending money: “Purchase of Services”</p>
                            </small>`
                                : ""
                            }
                            
                            <small>
                                    <p> <strong>NOTE: </strong>This is a computer generated invoice and does not
                                        require a signature</p>
                                    <p>Primary URL: <a href="/myinvoices/abc"> https://fundsforngos.org. </a></p>
                                    <p>Premium URL:<a href="/myinvoices/abc"> https://fundsforngospremium.com. </a>
                                    </p>
                                    <p> For any queries please contact us at <a
                                            href="/myinvoices/abc">https://support.fundsforngos.org/</a></p>
                                </small></div>
                            <div class="col-sm-12  mt-4">
                                <h3 class="text-center">THANK YOU FOR YOUR BUSINESS! </h3>
                            </div>
                        </div>
                        <div class=" print-footer row">
                            <div class="text-center col"><button class="btn btn-primary" id="print"  onclick="printInvoice()"> Print </button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>`;

};
