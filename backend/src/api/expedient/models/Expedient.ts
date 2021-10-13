import { model, Schema } from 'mongoose';
import { IExpedient } from '../interfaces/IExpedient';

const expedientSchema = new Schema(
  {
    expedient: { type: String, required: true, trim: true },
    consults: [
      {
        date: Date.now(),
        morbilidad: [
          {
            name: { type: String, required: true },
            codigo: { type: String, required: true },
          },
        ],
        medicaments: [
          {
            name: { type: String, required: true },
            presentation: { type: String, required: true },
            cantity: { type: Number, required: true },
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
