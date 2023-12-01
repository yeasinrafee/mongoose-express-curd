import { z } from "zod";

const addressValidationSchema = z.object({
  street: z.string().min(1, { message: "Street is required" }),
  city: z.string().min(1, { message: "City is required" }),
  country: z.string().min(1, { message: "Country is required" }),
});

const ordersValidationSchema = z.object({
  productName: z.string().min(1, { message: "Product name is required" }),
  price: z.number().min(0, { message: "Price must be a non-negative number" }),
  quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
});

export const usersValidationSchema = z.object({
  userId: z
    .number()
    .int()
    .positive({ message: "User ID must be a positive integer" }),
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  fullName: z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
  }),
  age: z.number().int().min(1, { message: "Age must be at least 1" }),
  email: z.string().email({ message: "Invalid email address" }),
  isActive: z.boolean().default(true),
  hobbies: z.array(
    z.string().min(1, { message: "Hobby must have at least 1 character" })
  ),
  address: addressValidationSchema,
  orders: z.array(ordersValidationSchema).optional(),
});
