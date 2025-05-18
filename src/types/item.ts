export interface Item {
  _id: string;
  category: string;
  name: string;
  images: string[];
  price: string | number;
  onSale: boolean;
  isNew: boolean;
  quantity: number;
}
