import dayjs from 'dayjs';

class Order {
    constructor(id, cartItems, subtotal, taxes, shippingFees, totalPrice, totalQuantity, date) {
        this.id = id;
        this.cartItems = cartItems;
        this.subtotal = subtotal;
        this.taxes = taxes;
        this.shippingFees = shippingFees;
        this.totalPrice = totalPrice;
        this.totalQuantity = totalQuantity;
        this.date = date;
    }

    get formattedDate() {
        return dayjs(this.date).format('dddd, MMMM D, YYYY h:mm A').toString();
    }
};

export default Order;