import { useState, createContext } from 'react';
import Cart from '../components/cart';
import '../styles/global.css'

export const CartContext = createContext({ cart: [] })
export const ImgTranslationRect = createContext({ rect: null })

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [imgTranslationRect, setImgTranslationRect] = useState(null);

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
      <ImgTranslationRect.Provider value={{imgTranslationRect, setImgTranslationRect}}>
        <Component {...pageProps} />
        <Cart isOpen={isCartOpen} onClose={close} />
      </ImgTranslationRect.Provider>
    </CartContext.Provider>
  )
}