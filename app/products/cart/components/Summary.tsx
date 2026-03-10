import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cookies } from "next/headers";
import { Cart } from "../../actions/shopping-card";
import { getProductsInCart } from "../../lib/getProductsInCart";

export default async function Summary(){
    const cookieStore = await cookies()
    const cart = JSON.parse(cookieStore.get('cart')?.value ?? '{}') as Cart
    const products = getProductsInCart(cart)

    const totalToPay = products.reduce((prev, current) => ( current.product.price * current.quantity) + prev, 0)

    if(totalToPay <= 0) return
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Total to Pay</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="mb-2">
                    {products.map(item => (
                        item.quantity > 0 && (
                            <li key={item.product.id}>
                                ${item.product.price * item.quantity} <span className="font-semibold">{item.product.name}</span>
                            </li>
                        )
                    ))}
                </ul>
                <p className="text-lg font-semibold">Total: ${ totalToPay.toFixed(2) }</p>
            </CardContent>
            <CardFooter>
                <Button size="lg" className="w-full">Buy</Button>
            </CardFooter>
        </Card>
    )
}