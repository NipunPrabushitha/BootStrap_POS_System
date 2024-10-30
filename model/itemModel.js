export default class ItemModel{
    constructor(itemId,itemName,unitPrice,quantity) {
        this._itemId = itemId;
        this._itemName = itemName;
        this._unitPrice = unitPrice;
        this._quantity = quantity;
    }

    get itemId() {
        return this._itemId;
    }

    set itemId(value) {
        this._itemId = value;
    }

    get itemName() {
        return this._itemName;
    }

    set itemName(value) {
        this._itemName = value;
    }

    get unitPrice() {
        return this._unitPrice;
    }

    set unitPrice(value) {
        this._unitPrice = value;
    }

    get quantity() {
        return this._quantity;
    }

    set quantity(value) {
        this._quantity = value;
    }
}