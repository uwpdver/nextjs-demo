import { createContext } from "react";
import { CartItem } from "./types";

export interface CardContextType {
  cart: CartItem[];
  add(CartItem): void;
  increaseCount(id:string): void;
  decreaseCount(id:string): void;
  remove(id:string): void;
  open(): void;
  close(): void;
}

const DEFAULT_VALUE: CardContextType = {
  cart: [],
  add: () => {},
  increaseCount: () => {},
  decreaseCount: () => {},
  remove: () => {},
  open: () => {},
  close: () => {},
};

export default createContext<CardContextType>(DEFAULT_VALUE);
