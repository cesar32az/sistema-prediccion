import { Response, Request } from 'express';
import { IExpedient } from '../interfaces/IExpedient';
import Expedient from '../models/Expedient';

export const updateExpedient = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { medicamentos, morbilidades, fecha } = req.body;
    const consulta = { medicaments: medicamentos, morbilidad: morbilidades, date: fecha };
    let expedient: IExpedient | null = await Expedient.findById(id);
    expedient?.consults.push(consulta);
    if (expedient) {
      const updatedExpedient = await Expedient.findByIdAndUpdate(id, expedient, { new: true });
      res.status(200).json({message: "Expedient updated successfully", updatedExpedient});
    }
  } catch (error) {
    res.status(400).json({ message: 'error updating expedient' });
  }
};
