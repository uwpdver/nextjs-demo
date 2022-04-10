import { Product, SizeOption, ColorOption } from "./../../types";

export interface CartItem
  extends Omit<Product, "sizes" | "colors" | "description" | "id"> {
  id: string;
  productId: number;
  count: number;
  size: SizeOption;
  color: ColorOption;
}
