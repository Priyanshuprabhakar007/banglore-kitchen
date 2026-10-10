import { BaseService } from './baseService';
import { 
  Category, 
  MenuItem, 
  Offer, 
  Banner, 
  Branch, 
  Order, 
  Reservation, 
  Notification,
  User
} from '../types';

export const categoryService = new BaseService<Category>('categories');
export const menuService = new BaseService<MenuItem>('menuItems');
export const offerService = new BaseService<Offer>('offers');
export const bannerService = new BaseService<Banner>('banners');
export const branchService = new BaseService<Branch>('branches');
export const orderService = new BaseService<Order>('orders');
export const reservationService = new BaseService<Reservation>('bookings');
export const notificationService = new BaseService<Notification>('notifications');
export const userService = new BaseService<User>('users');
