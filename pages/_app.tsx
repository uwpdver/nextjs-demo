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
    <CartContext.Provider value={{ cart, add, remove, open, close }}>
      <Component {...pageProps} />
      <CartComponent isOpen={isCartOpen} onClose={close} />
    </CartContext.Provider>
  );
}
