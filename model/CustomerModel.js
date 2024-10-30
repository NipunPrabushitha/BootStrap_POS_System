export default class CustomerModel{
    constructor(id,fullName,email,address,mobile) {
        this._id = id;
        this._fullName = fullName;
        this._email = email;
        this._address = address;
        this._mobile = mobile;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get fullName() {
        return this._fullName;
    }

    set fullName(value) {
        this._fullName = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get address() {
        return this._address;
    }

    set address(value) {
        this._address = value;
    }

    get mobile() {
        return this._mobile;
    }

    set mobile(value) {
        this._mobile = value;
    }
}