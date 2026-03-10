import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Product } from "../../lib/product";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MinusCircle, PlusCircle } from "lucide-react";

interface Props extends Product {
    quantity: number
}

export default function ItemCart({ quantity, name, image, price }: Props) {
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
                <Button variant="outline"><PlusCircle/></Button>
                <span className="text-base font-semibold">{quantity}</span>
                <Button variant="destructive"><MinusCircle/></Button>
            </CardFooter>
        </Card>
    )
}