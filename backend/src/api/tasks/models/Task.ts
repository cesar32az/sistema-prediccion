import { model, Schema } from 'mongoose';
import { ITask } from '../interfaces/ITask';
const taskSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    status: { type: Boolean, default: false },
    author: { ref: 'User', type: Schema.Types.ObjectId },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default model<ITask>('Task', taskSchema);
