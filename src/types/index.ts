export type Role = 'super_admin' | 'manager' | 'branch_admin' | 'customer';

export interface User {
  id?: string;
  uid: string;
  email: string | null;
  displayName: string;
  role: Role;
  isAnonymous: boolean;
  createdAt: string;
}

export interface Category {
  id?: string;
  name: string;
  imageUrl: string;
  order: number;
  isActive: boolean;
}

export interface MenuItem {
  id?: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  imageUrl: string;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  spiceLevel: number;
  isAvailable: boolean;
  preparationTime: number;
}

export interface Offer {
  id?: string;
  title: string;
  description: string;
  discountPercentage: number;
  validUntil: string;
  imageUrl: string;
  isActive: boolean;
}

export interface Banner {
  id?: string;
  title: string;
  imageUrl: string;
  link?: string;
  order: number;
  isActive: boolean;
}

export interface Branch {
  id?: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  openingTime: string;
  closingTime: string;
  isActive: boolean;
}

export interface Order {
  id?: string;
  customerId: string;
  customerName: string;
  items: any[];
  totalAmount: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  createdAt: string;
  deliveryAddress?: string;
}

export interface Reservation {
  id?: string;
  customerId: string;
  customerName: string;
  date: string;
  time: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  specialRequests?: string;
  createdAt: string;
}

export interface Notification {
  id?: string;
  title: string;
  message: string;
  createdAt: string;
  status: 'sent' | 'draft';
}
