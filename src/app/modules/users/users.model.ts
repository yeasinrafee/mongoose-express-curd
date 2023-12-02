import { Schema, model } from "mongoose";
import { TAddress, TOrders, TUsers, UsersModel } from "./users.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const addressSchema = new Schema<TAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const ordersSchema = new Schema<TOrders>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const usersSchema = new Schema<TUsers, UsersModel>({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  hobbies: [{ type: String }],
  address: {
    type: addressSchema,
    required: true,
  },
  orders: [ordersSchema],
});

// for hashing the password
usersSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

// making password field empty in response
usersSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

// creating a custom static method for user exists or not
usersSchema.statics.isUserExists = async function (userId: number) {
  const existingUsers = await Users.findOne({ userId });
  return existingUsers;
};

// creating user model
export const Users = model<TUsers, UsersModel>("User", usersSchema);
