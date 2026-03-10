

import { ShoppingCart } from "lucide-react";
import ProductList from "./components/ProductList";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function ProductsPage() {

    const cookieStore = await cookies()
    const cart = JSON.parse(cookieStore.get('cart')?.value ?? '{}')

    const totalItemsInCart = (() => {
        let items = 0

        Object.values(cart).forEach(value => {
            items += value as number
        })

        return items
    })()

    return (
        <>
            <header className="w-full px-8 mb-4 flex items-center justify-end">
                {totalItemsInCart > 0 && (
                    <Link 
                        href={'products/cart'}
                        className="p-2 flex items-center justify-end gap-2 bg-green-100 rounded"
                    >
                        <span>{ totalItemsInCart }</span>
                        <ShoppingCart/>
                    </Link>
                )}
            </header>
            <ProductList />
        </>
    )
}