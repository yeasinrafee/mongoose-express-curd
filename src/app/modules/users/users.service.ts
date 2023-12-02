import { TOrders, TUsers } from "./users.interface";
import { Users } from "./users.model";

const createUsersIntoDB = async (usersData: TUsers) => {
  if (await Users.isUserExists(usersData.userId)) {
    throw new Error("User already exists!");
  }
  const result = await Users.create(usersData);
  return result;
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
      select: "userId userName fullName age email isActive hobbies address",
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

export const UsersServices = {
  createUsersIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUserFromDB,
  addProductToOrder,
};
