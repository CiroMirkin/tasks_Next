import { products } from "../lib/product";
import Product from "./Product";

export default function ProductList() {
    return (
        <div className="flex gap-4 flex-wrap justify-center">
            {products.map(product => (
                <Product
                    {...product}
                    key={product.id}
                />
            ))}
        </div>
    )
}