import { Document } from 'mongoose';

export interface IExpedient extends Document {
  expedient: string;
  consults: [
    {
      date: Date;
      morbilidad: [{ name: string; codigo: string }];
      medicaments: [{ name: string; presentation: string; cantity: number }];
    },
  ];
  patient: string;
}
