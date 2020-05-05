export interface Category {
  _id?: string;
  name: string;
}

export interface Article {
  _id?: string;
  name: string;
  price: number;
  category?: string;
}

export interface OrderItem {
  article: string;
  quantity: number;
}

export interface Order {
  _id?: string;
  items: OrderItem[];
  total_price: number;
}
