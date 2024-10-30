////////////////////////////////////////////////////////////////////////////////////////////////


/*Customer Save and Table Update*/
////////////////////////////////////////////////////////////////////////////////////////////////

import CustomerModel from "../model/CustomerModel.js"
import {customerDB} from "../db/database.js";

let selected_customer_Index = null;

const sriLankanMobileRegex = /^(?:\+94|0)?7[0-9]{8}$/;
const validEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

$("#saveCustomer").on("click", function() {
    let Cus_Name = $("#customerName").val();
    let Email = $("#customerEmail").val();
    let Phone_Number = $("#customerPhone").val();
    let Cus_Address = $("#customerAddress").val();

    if (Cus_Name.length===0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Customer Name",
            footer: '<a href="#">Fill the Customer Name</a>'
        });
    }else if (!validEmail(Email)){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email",
            footer: '<a href="#">Fill the Email</a>'
        });
    }else if (Cus_Address.length===0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Address",
            footer: '<a href="#">Fill the Address</a>'
        });
    } else if (Phone_Number.length===0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Phone Number",
            footer: '<a href="#">Fill the Phone Number</a>'
        });
    }else {
        let customerData = new CustomerModel(
            customerDB.length + 1,
            Cus_Name,
            Email,
            Cus_Address,
            Phone_Number
        );
        customerDB.push(customerData);
        Swal.fire({
            title: "Customer is Saved!",
            text: "You clicked the button!",
            icon: "success"
        });
        customerTable();
    }
});

const customerTable = () => {
    $("#customerTable").empty();
    customerDB.map((item,index) => {
        let Data = `<tr>
            <td>${item.id}</td>
            <td>${item.fullName}</td>
            <td>${item.email}</td>
            <td>${item.address}</td>
            <td>${item.mobile}</td>
            </tr>`
        $("#customerTable").append(Data);
        clearForm();
    });
}

const clearForm = ()=>{
    $("#customerName").val('');
    $("#customerEmail").val('');
    $("#customerPhone").val('');
    $("#customerAddress").val('');
}

//////////////////////////////////////////////////////////////////////////////////////////////////


/*Customer Edit and Update*/
//////////////////////////////////////////////////////////////////////////////////////////////////

$("#updateCustomer").on("click",function (){
    updateCustomer();
})
function updateCustomer() {
    if (currentCustomerId != null) {
        const fullName = document.getElementById('customerName').value;
        const email = document.getElementById('customerEmail').value;
        const address = document.getElementById('customerAddress').value;
        const mobile = document.getElementById('customerPhone').value;

        const customerIndex = customerDB.findIndex(cust => cust.id === currentCustomerId);
        if (customerIndex !== -1) {
            customerDB[customerIndex] = { id: currentCustomerId, fullName, email, address, mobile };
            customerTable();
            clearForm();
        }
    } else {
        alert("No customer selected for update.");
    }
}


/////////////////////////////////////////////////////////////////////////////////////
/*Search Customer By Phone Number*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let currentCustomerId = null;
$("#customerSearch").on("click",function (){
    searchCustomerByPhone();
    $("#customerPhoneSearch").val('');
});
function searchCustomerByPhone(phoneNumber) {
    const CuzPhoneNumber = document.getElementById("customerPhoneSearch").value;
    const customer = customerDB.find(cust => cust.mobile === CuzPhoneNumber);

    // Check if the customer was found
    if (customer) {
        document.getElementById("customerName").value = customer.fullName;
        document.getElementById("customerEmail").value = customer.email;
        document.getElementById("customerAddress").value = customer.address;
        document.getElementById("customerPhone").value = customer.mobile;
        currentCustomerId = customer.id;
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Customer Not Found!",
            footer: '<a href="#">Enter Correct Customer Number</a>'
        });
    }
}



///////////////////////////////////////////////////////////////////////////////////////////////

/*Delete Customer*/
////////////////////////////////////////////////////////////////////////////////////////////////
$("#deleteCustomer").on("click", function (){
    deleteCustomer();
});
function deleteCustomer() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            const phone = document.getElementById('customerPhone').value;
            const customerIndex = customerDB.findIndex(customer => customer.phone === phone);
            customerDB.splice(customerIndex, 1);
            clearForm();
            customerTable();
            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
            });
        }
    });
}



