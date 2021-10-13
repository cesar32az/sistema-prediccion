import { Document } from 'mongoose';

export interface IPatient extends Document {
  name: string;
  birthDate: Date;
  direction: string;
  gender: string;
  department: string;
  municipality: string;
  expedient: string;
}
