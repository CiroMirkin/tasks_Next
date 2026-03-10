import { cookies } from "next/headers"
import { type Cart } from "../../actions/shopping-card"
import { Product, products } from "../../lib/product"
import ItemCart from "./ItemCart"

interface ProductInCart {
    product: Product
    quantity: number
}

const getProductsInCart = (cart: Cart): ProductInCart[] => {
    const productsInCart: ProductInCart[] = []
    for (const id of Object.keys(cart)) {
        const product = products.find(prod => prod.id === id)
        if(product) {
            productsInCart.push({
                product,
                quantity: cart[id]
            })
        }
    }
    return productsInCart
}

export default async function Cart(){
    
    const cookieStore = await cookies()
    const cart = JSON.parse(cookieStore.get('cart')?.value ?? '{}') as Cart
    const products = getProductsInCart(cart)

    return (
        <div className="w-full sm:w-8/12 flex flex-col gap-4">
            {
                products.map(product => (
                    <ItemCart
                        key={product.product.id}
                        {...product.product}
                        quantity={product.quantity}
                    />
                ))
            }
        </div>
    )
}