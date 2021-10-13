import { Document } from 'mongoose';

export interface IExpedient extends Document {
  expedient: string;
  consults: [
    {
      date: Date;
      moribilidad: [{ name: string; codigo: string }];
      medicaments: [{ name: string; presentation: string; cantity: number }];
      patient: string;
    },
  ];
}
