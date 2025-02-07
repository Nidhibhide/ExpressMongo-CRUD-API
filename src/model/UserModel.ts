import { model } from "mongoose";
import { IUser } from "../types/UserType";
import userSchema from "../schema/UserSchema";

const UserModel = model<IUser>("User", userSchema);

export default UserModel;
