export class OrderItemPayload {
    customerId: number;
    productList: ProductList[];
    constructor(){
        this.customerId = 1;
        this.productList = [];
    }
}

export class ProductList {
    productId: number;
    quantity: number;
    constructor (){
        this.productId = 0;
        this.quantity = 0;
    }
}