import { model, Schema } from 'mongoose';
import { IExpedient } from '../interfaces/IExpedient';

const expedientSchema = new Schema(
  {
    expedient: { type: String, required: true, trim: true },
    consults: [
      {
        date: Date,
        morbilidad: [
          {
            name: { type: String },
            codigo: { type: String },
          },
        ],
        medicaments: [
          {
            name: { type: String },
            presentation: { type: String },
            cantity: { type: Number },
          },
        ],
      },
    ],
    patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default model<IExpedient>('Expedient', expedientSchema);
