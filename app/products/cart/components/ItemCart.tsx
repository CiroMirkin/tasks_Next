"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Product } from "../../lib/product";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MinusCircle, PlusCircle } from "lucide-react";
import * as cartActions from "../../actions/shopping-card";
import { useRouter } from "next/navigation";

interface Props extends Product {
    quantity: number
}

export default function ItemCart({ id, quantity, name, image, price }: Props) {
    const router = useRouter()
    
    const handleAddToCart = async () => {
        await cartActions.addProductToCart(id)
        router.refresh()
    }

    const handleRemoveSingleFromCart = async () => {
        await cartActions.deleteSingleItemFromCart(id)
        router.refresh()
    }
    
    if(quantity <= 0) return
    return (
        <Card className="flex flex-row items-center gap-4 p-4">
            <CardHeader className="p-0 w-20">
                <Image 
                    width={200}
                    height={200}
                    className="rounded object-cover"
                    src={image}
                    alt={name}
                />
            </CardHeader>
            <CardContent className="flex-1 self-start p-0">
                <p className="text-lg font-semibold">{name}</p>
                <p className="text-base">Total: ${price}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center gap-4">
                <Button variant="outline" onClick={handleAddToCart}><PlusCircle/></Button>
                <span className="text-base font-semibold">{quantity}</span>
                <Button variant="destructive" onClick={handleRemoveSingleFromCart}><MinusCircle/></Button>
            </CardFooter>
        </Card>
    )
}