export interface Option<T> {
  key: string;
  value: string | number;
  content: T;
}

export interface SizeOption extends Option<string> {}

export interface ColorContent {
  colorName: string;
  colorHEX: string;
}

export interface ColorOption extends Option<ColorContent> {}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  cover: string;
  sizes: SizeOption[];
  colors: ColorOption[];
}
