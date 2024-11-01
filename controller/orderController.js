import {customerDB, orderDB} from "../db/database.js";
import {itemDB} from "../db/database.js";
import ItemModel from "../model/ItemModel.js";

let orderTableArr = [];

let itemDBClone = itemDB;

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
/*$("#purchaseButton").on("click", function () {
    orderIDField.value = generateOrderId();  // Set the generated ID in the input field
});*/


//////////////////////////////////////////////////////////////////////////////////////////////////////
/*Add Items to the table*/
////////////////////////////////////////////////////////////////////////////////////////////////////

function updateOrderTable() {

    let itemId = document.getElementById("itemSelect").value;
    let itemName = document.getElementById("itemsName").value;
    let price = parseFloat(document.getElementById("price").value);
    let orderQty = parseInt(document.getElementById("orderQty").value);
    let totalPrice = price * orderQty;

    let QTY_Hand = parseInt(document.getElementById("qty").value);

    if(isNaN(orderQty) || orderQty <= 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Item Quantity",
            footer: '<a href="#">Fill the Item Quantity</a>'
        });
    }else{

        orderTableArr.push([itemId, itemName,price, orderQty, totalPrice]);

        $("#orderTable").empty();
        orderTableArr.forEach(order => {
            const row = `
            <tr>
                <td>${order[0]}</td>
                <td>${order[1]}</td>
                <td>${order[2]}</td>
                <td>${order[3]}</td>
                <td>${order[4]}</td>
            </tr>
        `;
            $("#orderTable").append(row);
        });
    }
}

$("#addItemBtn").on("click", function () {
    updateOrderTable();
    clearItemSide();
    calculateTotal();
});

function clearItemSide(){
    document.getElementById("orderQty").value = "";
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Calculate Total*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////
function calculateTotal() {
    let total = 0;
    const table = document.getElementById("orderTable");

    // Loop through each row except the header row
    for (let i = 0; i < table.rows.length; i++) {
        const totalCell = table.rows[i].cells[4]; // Assuming "Total" is in the 5th column (index 4)
        const cellValue = parseFloat(totalCell.innerText || totalCell.textContent); // Parse as float for decimal values

        if (!isNaN(cellValue)) {
            total += cellValue; // Add to total if it's a valid number
        }
    }
    document.querySelector("p.text-danger").textContent = `SubTotal: ${total.toFixed(2)}`;
    /*document.querySelector("h4 > strong").textContent = total.toFixed(2);*/
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Cash And Discount*/
/////////////////////////////////////////////////////////////////////////////////////////////////////////

function getSubTotalValue() {
    const subTotalText = document.querySelector("p.text-danger").textContent;
    // Extract the number from the text "SubTotal: 123.45"
    const subTotal_value = parseFloat(subTotalText.replace("SubTotal: ", ""));
    return subTotal_value;
}

// Example usage

function calculateCashBalance(){
    const currentSubTotal = getSubTotalValue();
    let cash = document.getElementById("cash").value;
    let discount = document.getElementById("discount").value;

    if (isNaN(cash) || isNaN(discount) || isNaN(currentSubTotal)) {
        alert("Please enter valid numbers");
    }else {
        let totalAmount = (currentSubTotal - discount);
        let cashBalance = (cash - totalAmount);

        console.log(cashBalance);
        /*document.getElementById("balance").value = cashBalance.toFixed(2);*/
        document.querySelector("h4 > strong").textContent = totalAmount.toFixed(2);
        document.querySelector("h5 > strong").textContent = cashBalance.toFixed(2);
    }
}

$("#purchaseButton").on("click", function (){
    calculateCashBalance();
});













