import {customerDB, orderDB} from "../db/database.js";
import {itemDB} from "../db/database.js";

/////////////////////////////////////////////////////////////////////////////////////////////
/*Customer Drop Down*/
////////////////////////////////////////////////////////////////////////////////////////////


$("#ORDERS").on("click",function (){
    populateCustomerDropdown();
    populateItemDropdown();
});




function populateCustomerDropdown() {
    const customerSelect = document.getElementById("customerSelect");

    // Clear existing options if any
    customerSelect.innerHTML = "";

    // Loop through CustomerDB to create option elements
    customerDB.forEach(customer => {
        console.log("Adding customer ID:", customer.id);
        const option = document.createElement("option");
        option.value = customer.id;
        option.textContent = customer.id;
        customerSelect.appendChild(option);
    });

}


function handleCustomerSelection() {
    const customerSelect = document.getElementById("customerSelect");
    const nameField = document.getElementById("Cus_name");
    const addressField = document.getElementById("Cus_address");

    // Find the selected customer from CustomerDB
    const selectedCustomerId = customerSelect.value;

    const customer = customerDB.find(c => {
        return String(c.id) === String(selectedCustomerId);
    });
    // Update name and address fields if a customer is found
    if (customer) {
        nameField.value = customer.fullName;
        addressField.value = customer.address;
    } else {
        nameField.value = "";
        addressField.value = "";
    }
}

$("#customerSelect").on("click",function (){
    handleCustomerSelection();
});




/////////////////////////////////////////////////////////////////////////////////////////////
/*Item DropDown*/
////////////////////////////////////////////////////////////////////////////////////////////


function populateItemDropdown() {
    const itemSelect = document.getElementById("itemSelect");

    // Clear existing options if any
    itemSelect.innerHTML = "";

    // Loop through CustomerDB to create option elements
    itemDB.forEach(item => {
        console.log("Adding customer ID:", item.itemId);
        const option = document.createElement("option");
        option.value = item.itemId;
        option.textContent = item.itemId;
        itemSelect.appendChild(option);
    });

}

function handleItemSelection() {
    const itemSelect = document.getElementById("itemSelect");
    const ItemNameField = document.getElementById("itemsName");
    const qtyField = document.getElementById("qty");
    const price = document.getElementById("price");

    // Find the selected customer from CustomerDB
    const selectedItemId = itemSelect.value;

    const item = itemDB.find(i => {
        return String(i.itemId) === String(selectedItemId);
    });
    // Update name and address fields if a customer is found
    if (item) {
        ItemNameField.value = item.itemName;
        price.value = item.unitPrice;
        qtyField.value = item.quantity;
    } else {
        ItemNameField.value = "";
        price.value = "";
        qtyField.value = "";
    }
}
$("#itemSelect").on("click",function (){
    handleItemSelection();
});

/////////////////////////////////////////////////////////////////////////////////////////////////
/*Generate Next Order Id*/
////////////////////////////////////////////////////////////////////////////////////////////////


let currentOrderId = orderDB.length + 1;

function generateOrderId() {
    return "O" + currentOrderId.toString().padStart(3, '0');
}

let orderIDField = document.getElementById('orderID');
$("#purchaseButton").on("click", function () {
    orderIDField.value = generateOrderId();  // Set the generated ID in the input field
});


//////////////////////////////////////////////////////////////////////////////////////////////////////
/*Add Items to the table*/
////////////////////////////////////////////////////////////////////////////////////////////////////


