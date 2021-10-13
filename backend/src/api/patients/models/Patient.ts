import { model, Schema } from 'mongoose';
import { IPatient } from '../interfaces/IPatient';

const patientSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    birthDate: { type: Date, required: true, trim: true },
    direction: { type: String, required: true },
    gender: { type: String, required: true },
    department: { type: String, required: true },
    municipality: { type: String, required: true },
    expedient: { type: Schema.Types.ObjectId, ref: 'Expedient' },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default model<IPatient>('Patient', patientSchema);
