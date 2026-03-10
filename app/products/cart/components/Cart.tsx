import { cookies } from "next/headers"
import { type Cart } from "../../actions/shopping-card"
import ItemCart from "./ItemCart"
import { getProductsInCart } from "../../lib/getProductsInCart"

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