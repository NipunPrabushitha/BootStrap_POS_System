export default class OrderModel{
    constructor(orderId,customerId,date,totalAmount) {
        this._orderId = orderId;
        this._customerId = customerId;
        this._date = date;
        this._totalAmount = totalAmount;
    }


    get orderId() {
        return this._orderId;
    }

    set orderId(value) {
        this._orderId = value;
    }

    get customerId() {
        return this._customerId;
    }

    set customerId(value) {
        this._customerId = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get totalAmount() {
        return this._totalAmount;
    }

    set totalAmount(value) {
        this._totalAmount = value;
    }
}