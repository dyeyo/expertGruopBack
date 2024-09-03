import { Schema, model } from "mongoose";
import { IUser } from "./../interfaces/IUser";

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Users = model<IUser>("Users", userSchema);
export default Users;
