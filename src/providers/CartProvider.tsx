import { createContext, useContext, PropsWithChildren, useState } from "react";
import { CartItem, Product } from "../types";
import { randomUUID } from "expo-crypto"

type CartType = {
    items: CartItem[],
    addItem: (product: Product, size: CartItem['size']) => void,
    updateQuantity: (id: string, amount: 1 | -1) => void,    
}

const CartContext = createContext<CartType>({
    items: [],
    addItem: () => {},
    updateQuantity: () => {},
});


const CartProvider = ({ children }: PropsWithChildren) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = (product: Product, size: CartItem['size']) => {
        const existingItem = items.find(
            item => item.product === product && item.size === size
        );

        if(existingItem){
            updateQuantity(existingItem.id, 1);
        }

        else{
            const newCartItem: CartItem = {
                id: randomUUID(),
                product,
                product_id: product.id,
                quantity: 1,
                size,
            };

            setItems([newCartItem, ...items]);
        }
    };

    const updateQuantity = (id: string, amount: 1 | -1) => {
        setItems(
            items.map(item => item.id !== id ? item : {...item, quantity: item.quantity + amount})
                .filter(item => item.quantity > 0))
    };

    return(
        <CartContext.Provider value={{ items, addItem, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;

export const useCart = () => useContext(CartContext);