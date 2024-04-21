export interface CartItem {
  id?: number;
  name: string;
  quantity: number;
  price: number;
  description: string;
}
export interface Product {
  id?: number;
  name: string;
  quantity: number;
  price: number;
  description: string;
}

export interface Farm {
  id: Number;
  farm_name: string;
  location: string;
  establishment_date: Date;
  contact_person: string;
  contact_email: string;
  contact_phone: string;
  description: string;
}
