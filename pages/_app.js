import { useState, createContext } from 'react';
import Cart from '../components/cart';
import '../styles/global.css'

export const CartContext = createContext({ cart: [] })

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const add = (item) => {
    setCart((prevState) => [...prevState, item])
  }

  const remove = (targetId) => {
    setCart((prevState) => prevState.filter(({ id }) => id !== targetId))
  }

  const open = () => {
    setIsCartOpen(true);
  }

  const close = () => {
    setIsCartOpen(false);
  }

  return (
    <CartContext.Provider value={{ cart, add, remove, open, close }}>
      <Component {...pageProps} />
      <Cart isOpen={isCartOpen} onClose={close}/>
    </CartContext.Provider>
  )
}