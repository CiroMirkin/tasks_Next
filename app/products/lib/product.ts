export interface Product {
  id    : string;
  name  : string;
  price : number;
  rating: number;
  image : string;
}

export const products:Product[] = [
  {
    id: 'UUID-ABC-1',
    name: 'Hoodie',
    price: 15,
    rating: 5,
    image: '/images/product_0.jpeg',
  },
  {
    id: 'UUID-ABC-2',
    name: 'Cap',
    price: 25,
    rating: 3,
    image: '/images/product_0.jpeg',
  },
  {
    id: 'UUID-ABC-3',
    name: 'Let my sunshine',
    price: 36,
    rating: 2,
    image: '/images/product_0.jpeg',
  },
  {
    id: 'UUID-ABC-4',
    name: 'Red Hoodie',
    price: 45,
    rating: 5,
    image: '/images/product_0.jpeg',
  },
]