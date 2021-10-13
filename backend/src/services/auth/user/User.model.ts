import { Schema, model, Document } from 'mongoose';
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  roles: Array<string>;
  _id: string;
  name: string;
}

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export default model<IUser>('User', userSchema);
