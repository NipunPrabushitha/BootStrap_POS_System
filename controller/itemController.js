////////////////////////////////////////////////////////////////////////////////////////////////
/*Item Save*/
////////////////////////////////////////////////////////////////////////////////////////////////


import ItemModel from "../model/ItemModel.js";
import {itemDB} from "../db/database.js";

let selected_item_Index = null;



$("#saveItems").on("click", function() {
    console.log("awaaaaaa");
    let ItemName = $("#itemName").val();
    let Price = $("#unitPrice").val();
    let Quantity = $("#itemQuantity").val();



    if (ItemName.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Item Name",
            footer: '<a href="#">Fill in the Item Name</a>'
        });
    } else if (Price.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Unit Price",
            footer: '<a href="#">Enter a valid Unit Price</a>'
        });
    } else if (Quantity.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Quantity",
            footer: '<a href="#">Enter a valid Quantity</a>'
        });
    } else {
        let itemData = new ItemModel(
            itemDB.length + 1,
            ItemName,
            Price,
            Quantity
        );
        itemDB.push(itemData);
        Swal.fire({
            title: "Item Saved!",
            text: "You clicked the button!",
            icon: "success"
        });

        itemTable();
    }
});

// Function to display the item list
const itemTable = () => {
    $("#itemTable").empty();
    itemDB.map((items,index) => {
        let Data = `<tr>
            <td>${items.itemId}</td>
            <td>${items.itemName}</td>
            <td>${items.unitPrice}</td>
            <td>${items.quantity}</td>
            </tr>`
        $("#itemTable").append(Data);
        clearItemForm();
    });
}

// Function to clear the form fields
const clearItemForm = () => {
    $("#itemName").val('');
    $("#unitPrice").val('');
    $("#itemQuantity").val('');
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*Item Update*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////






/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*item search*/
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let currentItemId = null; // To keep track of the currently selected item

$("#itemSearch").on("click", function (event) {
    searchItemByName();
    $("#itemSearchByName").val(''); // Clear the search input after searching
});

// Function to search for an item by name
function searchItemByName() {

    const searchName = document.getElementById("itemSearchByName").value;
    const item = itemDB.find(it => it.itemName === searchName);

    // Check if the customer was found
    if (item) {
        document.getElementById("itemName").value = item.itemName;
        document.getElementById("unitPrice").value = item.unitPrice;
        document.getElementById("itemQuantity").value = item.quantity;
        currentItemId = item.itemId; // Set current item ID
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Customer Not Found!",
            footer: '<a href="#">Enter Correct Customer Number</a>'
        });
    }
}



