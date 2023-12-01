import { TUsers } from "./users.interface";
import { UserModel } from "./users.model";

const createUsersIntoDB = async (users: TUsers) => {
  const result = await UserModel.create(users);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

export const UsersServices = {
  createUsersIntoDB,
  getAllUsersFromDB,
};