import { TOrders, TUsers } from "./users.interface";
import { Users } from "./users.model";

const createUsersIntoDB = async (usersData: TUsers) => {
  if (await Users.isUserExists(usersData.userId)) {
    throw new Error("User already exists!");
  }
  const result = await Users.create(usersData);

  // It'll not provide the unwanted fields
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { password, _id, orders, ...responseUser } = result.toObject();
  return responseUser;
};

const getAllUsersFromDB = async () => {
  const result = await Users.find(
    {},
    {
      username: 1,
      fullName: 1,
      age: 1,
      email: 1,
      address: 1,
      _id: 0,
    }
  );
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  if (await Users.isUserExists(userId)) {
    const result = await Users.findOne(
      { userId },
      { password: 0, orders: 0, _id: 0, __v: 0 }
    );
    return result;
  }
  throw new Error("User not found");
};

const updateUserFromDB = async (userId: number, updatedUserData: TUsers) => {
  if (await Users.isUserExists(userId)) {
    const result = await Users.findOneAndUpdate({ userId }, updatedUserData, {
      new: true,
      select:
        "userId username fullName age email isActive hobbies address -_id",
    });
    return result;
  }
  throw new Error("User not found");
};

const deleteUserFromDB = async (userId: number) => {
  if (await Users.isUserExists(userId)) {
    const result = await Users.deleteOne({ userId });
    return result;
  }
  throw new Error("User not found");
};

// For order management
const addProductToOrder = async (userId: number, newOrder: TOrders) => {
  if (await Users.isUserExists(userId)) {
    const result = await Users.findOneAndUpdate(
      { userId },
      {
        $push: { orders: newOrder },
      },
      {
        new: true,
        upsert: true,
      }
    );
    return result;
  }
  throw new Error("User not found");
};

const getOrderOfUser = async (userId: number) => {
  if (await Users.isUserExists(userId)) {
    const result = await Users.findOne({ userId }, { orders: 1, _id: 0 });
    return result;
  }
  throw new Error("User not found");
};

const getTotalPriceOfOrder = async (userId: number) => {
  if (await Users.isUserExists(userId)) {
    const result = await Users.findOne({ userId }, { orders: 1, _id: 0 });
    const totalPrice = result?.orders
      ?.reduce((sum, order) => sum + order.price * order.quantity, 0)
      .toFixed(2);
    return Number(totalPrice);
  }
  throw new Error("User not found");
};

export const UsersServices = {
  createUsersIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUserFromDB,
  addProductToOrder,
  getOrderOfUser,
  getTotalPriceOfOrder,
};
