import Cart from "./components/Cart";
import Summary from "./components/Summary";

export default async function  CartPage() {
    
    return (
        <main className="w-full px-6 py-4">
            <h1 className="mb-6">Products</h1>
            <div className="flex flex-col sm:flex-row gap-4">
                <Cart />
                <div className="flex flex-col w-full sm:w-4/12">
                    <Summary />
                </div>
            </div>
        </main>
    )
}