////////////////////////////////////////////////////////////////////////////////////////////////
/*Item Save*/
////////////////////////////////////////////////////////////////////////////////////////////////


import ItemModel from "../model/ItemModel.js";
import {itemDB} from "../db/database.js";

let selected_item_Index = null;



$("#saveItems").on("click", function() {
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

$("#updateItem").on("click",function (){
    updateItem();
})
function updateItem() {
    if (currentItemId != null) {
        let ItemName = $("#itemName").val();
        let Price = $("#unitPrice").val();
        let Quantity = $("#itemQuantity").val();

        const itemIndex = itemDB.findIndex(it => it.itemId === currentItemId);
        if (itemIndex !== -1) {
            let itemUpdate = new ItemModel(
                currentItemId,
                ItemName,
                Price,
                Quantity
            );
            itemDB[itemIndex] = itemUpdate;
            itemTable();
        }
    } else {
        alert("No item selected for update.");
    }
}




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

///////////////////////////////////////////////////////////////////////////////////////////////////////
/*Item Delete*/
///////////////////////////////////////////////////////////////////////////////////////////////////////

$("#deleteItem").on("click", function(){
   deleteItem();
});

function deleteItem(){
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
            const itemName = document.getElementById('itemName').value;
            const itemIndex = itemDB.findIndex(item => item.itemName === itemName);
            itemDB.splice(itemIndex, 1);
            clearItemForm();
            itemTable();
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




