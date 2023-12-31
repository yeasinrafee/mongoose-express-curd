import { Model } from "mongoose";

export type TAddress = {
  street: string;
  city: string;
  country: string;
};
export type TOrders = {
  productName: string;
  price: number;
  quantity: number;
};
export type TUsers = {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: Array<string>;
  address: TAddress;
  orders?: TOrders[];
};

// for creating static (if user exists or not)
export interface UsersModel extends Model<TUsers> {
  isUserExists(userId: number): Promise<TUsers | null>;
}
