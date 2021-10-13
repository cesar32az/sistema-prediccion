import { Schema, model, Document } from 'mongoose';

export interface IRoles extends Document {
  name: string;
  _id: string;
}

export const ROLES: Array<string> = ['user', 'admin', 'creator'];

const roleSchema = new Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  },
);

export default model<IRoles>('Role', roleSchema);
