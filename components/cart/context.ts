import { createContext } from "react";
import { CartItem } from "./types";

export interface CardContextType {
  cart: CartItem[];
  add(CartItem): void;
  remove(id: number): void;
  open(): void;
  close(): void;
}

const DEFAULT_VALUE: CardContextType = {
  cart: [],
  add: () => {},
  remove: () => {},
  open: () => {},
  close: () => {},
};

export default createContext<CardContextType>(DEFAULT_VALUE);
