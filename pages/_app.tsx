import { useState } from "react";
import { AppProps } from "next/app";

import CartComponent, { CartContext, CartItem } from "../components/cart";
import "../styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const add = (item) => {
    setCart((prevState) => [...prevState, item]);
  };

  const setCartItemCount =
    (updater: (cartItem: CartItem) => number) => (id) => {
      const cartItemIndex = cart.findIndex((item) => id === item.id);
      if (cartItemIndex !== -1) {
        const cartItem = cart[cartItemIndex];
        setCart([
          ...cart.slice(0, cartItemIndex),
          {
            ...cartItem,
            count: updater(cartItem),
          },
          ...cart.slice(cartItemIndex + 1),
        ]);
      }
    };

  const increaseCount = setCartItemCount(({ count }) =>
    Math.min(count + 1, 999)
  );

  const decreaseCount = setCartItemCount(({ count }) => Math.max(count - 1, 0));

  const remove = (targetId) => {
    setCart((prevState) => prevState.filter(({ id }) => id !== targetId));
  };

  const open = () => {
    setIsCartOpen(true);
  };

  const close = () => {
    setIsCartOpen(false);
  };

  return (
    <CartContext.Provider
      value={{ cart, add, remove, open, close, increaseCount, decreaseCount }}
    >
      <Component {...pageProps} />
      <CartComponent isOpen={isCartOpen} onClose={close} />
    </CartContext.Provider>
  );
}
