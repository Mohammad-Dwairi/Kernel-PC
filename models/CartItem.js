class CartItem {
    constructor(id, categoryId, brand, model, quantity, image, price, inStock) {
        this.id = id;
        this.categoryId = categoryId;
        this.brand = brand,
        this.model = model;
        this.image = image;
        this.quantity = quantity;
        this.price = price;
        this.inStock = inStock
    }
};

export default CartItem;