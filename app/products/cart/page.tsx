import Cart from "./components/Cart";

export default async function  CartPage() {
    
    return (
        <main className="w-full px-6 py-4">
            <h1 className="mb-6">Products</h1>
            <Cart />
        </main>
    )
}