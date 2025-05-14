export interface Item {
  id: string;
  category: string;
  name: string;
  image: string;
  price: string | number;
  onSale: boolean;
  isNew: boolean;
  quantity: number;
}
