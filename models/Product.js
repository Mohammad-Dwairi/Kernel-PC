class Product {

    constructor(id, categoryId, brand, model, price, color, images, quantity, description, likes, dislikes){
        this.id = id;
        this.categoryId = categoryId;
        this.brand = brand;
        this.model = model;
        this.price = price;
        this.color = color;
        this.images = images;
        this.quantity = quantity;
        this.description = description;
        this.likes = likes;
        this.dislikes = dislikes;
    }
};

export default Product;