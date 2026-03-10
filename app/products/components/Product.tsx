"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PlusCircle, Trash } from "lucide-react";
import Image from "next/image";
import { type Product } from "../lib/product";
import * as cartActions from "../actions/shopping-card";
import { useRouter } from "next/navigation";

export default function Product({ id, image, name, price }: Product) {
    const router = useRouter()

    const handleAddToCart = async () => {
        await cartActions.addProductToCart(id)
        router.refresh()
    }

    const handleRemoveFromCart = async () => {
        await cartActions.deleteProductFromCart(id)
        router.refresh()
    }

    return (
        <Card>
            <CardHeader>
                <Image 
                    width={500}
                    height={500}
                    className="rounded"
                    src={image}
                    alt={name}
                />
            </CardHeader>
            <CardContent>
                <p className="font-semibold text-lg">{name}</p>
                <p className="text-base">${price}</p>
            </CardContent>
            <CardContent className="flex gap-2">
                <Button onClick={handleAddToCart}><PlusCircle /> Add</Button>
                <Button onClick={handleRemoveFromCart} variant="destructive"><Trash /> Delete</Button>
            </CardContent>
        </Card>
    )
}