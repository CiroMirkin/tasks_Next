"use client"

import { getCookie, hasCookie, setCookie } from "cookies-next"

/* ID: Amount */

interface Cart {
    [ id:string ]: number
}

export const getCookieCart = async (): Promise<Cart> => {
    if(hasCookie('cart')) {
        const cookieCart = JSON.parse(await getCookie('cart') as string|| '{}')
        return cookieCart
    }

    return {}
}

export const addProductToCart = async (id: string) => {
    const cookieCart = await getCookieCart()
    if(cookieCart[id]) {
        cookieCart[id] = cookieCart[id]+=1
    }
    else {
        cookieCart[id] = 1
    }
    await setCookie('cart', JSON.stringify(cookieCart))
} 

export const deleteProductFromCart = async (id: string) => {
    const cookieCart = await getCookieCart()
    if(cookieCart[id]) {
        cookieCart[id] = 0
    }
    await setCookie('cart', JSON.stringify(cookieCart))
}