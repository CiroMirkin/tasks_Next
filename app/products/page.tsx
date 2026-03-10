

import { ShoppingCart } from "lucide-react";
import ProductList from "./components/ProductList";
import { cookies } from "next/headers";

export default async function ProductsPage() {

    const cookieStore = await cookies()
    const cart = JSON.parse(cookieStore.get('cart')?.value ?? '{}')

    const getTotalCount = () => {
        let items = 0

        Object.values(cart).forEach(value => {
            items += value as number
        })

        return items
    }

    return (
        <>
            <header className="w-full px-8 mb-4 flex items-center justify-end gap-2">
                <span>{ getTotalCount() }</span>
                <ShoppingCart/>
            </header>
            <ProductList />
        </>
    )
}