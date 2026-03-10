import type { Cart } from "../actions/shopping-card";
import { Product, products } from "./product";

interface ProductInCart {
    product: Product
    quantity: number
}

export const getProductsInCart = (cart: Cart): ProductInCart[] => {
    const productsInCart: ProductInCart[] = []
    for (const id of Object.keys(cart)) {
        const product = products.find(prod => prod.id === id)
        if (product) {
            productsInCart.push({
                product,
                quantity: cart[id]
            })
        }
    }
    return productsInCart
}
