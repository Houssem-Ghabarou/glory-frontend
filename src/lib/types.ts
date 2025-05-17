export interface Color {
  name: string;
  value: string;
}

export interface Variations {
  [color: string]: {
    [size: string]: number;
  };
}

export interface FormData {
  name: string;
  collection: string;
  price: string;
  description: string;
  category: string;
  featured: boolean;
}

export interface PreviewImage extends File {
  preview: string;
}
