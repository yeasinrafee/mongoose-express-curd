import { TUsers } from "./users.interface";
import { Users } from "./users.model";

const createUsersIntoDB = async (usersData: TUsers) => {
  if (await Users.isUserExists(usersData.userId)) {
    throw new Error("User already exists!");
  }
  const result = await Users.create(usersData);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await Users.find({}, "username fullName age email address");
  return result;
};
const getSingleUserFromDB = async (userId: number) => {
  if (await Users.isUserExists(userId)) {
    const result = await Users.findOne({ userId });
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

export const UsersServices = {
  createUsersIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
};
