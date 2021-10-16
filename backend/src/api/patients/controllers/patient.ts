import { RequestHandler, Response } from 'express';
import Expedient from '../../expedient/models/Expedient';
import Patient from '../models/Patient';
import { IPatient } from '../interfaces/IPatient';
import { IExpedient } from '../../expedient/interfaces/IExpedient';

export const createPatient: RequestHandler = async (req, res): Promise<Response> => {
  try {
    // create patient
    const patient: IPatient = req.body;
    const newPatient: IPatient = new Patient(patient);

    // create expedient of patient
    const newExpedient: IExpedient = new Expedient({expedient: patient.expedient})

    // refs patient -> expedient
    newPatient.expedient = newExpedient._id
    newExpedient.patient = newPatient._id;
    
    // save patient and expedient
    const savedPatient: IPatient = await newPatient.save();
    const savedExpedient: IExpedient = await newExpedient.save();

    return res.status(201).json({ message: 'Patient successfully created.', savedPatient, savedExpedient });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

export const getAllPatients: RequestHandler = async (req, res): Promise<Response> => {
  try {
    const patients: IPatient[] = await Patient.find().populate('expedient');

    if (!patients) return res.status(400).json({ message: 'Patients not found.' });

    return res.status(200).json({ message: 'Patients founded', patients });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
export const getOnePatient: RequestHandler = async (req, res): Promise<Response> => {
  try {
    const patient: IPatient | null = await Patient.findById(req.params.id).populate('expedient');

    if (!patient) return res.status(400).json({ message: 'Patient not' });

    return res.status(200).json({ message: 'Patient successfully retrieved.', patient });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

export const deletePatient: RequestHandler = async (req, res): Promise<Response> => {
  try {
    const patient: IPatient | null = await Patient.findByIdAndDelete(req.params.id);

    if (!patient) return res.status(400).json({ message: 'Patient not found' });

    return res.status(200).json({ message: 'Patient successfully deleted', patient });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
export const updatePatient: RequestHandler = async (req, res): Promise<Response> => {
  try {
    const patient: IPatient | null = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!patient) return res.status(400).json({ message: 'Patient not found' });

    return res.status(200).json({ message: 'Patient successfully updated', patient });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
