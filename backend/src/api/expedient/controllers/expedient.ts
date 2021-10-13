import { RequestHandler, Response } from 'express';
import { IExpedient } from '../interfaces/IExpedient';


export const create: RequestHandler = async (req, res): Promise<Response> => {
  try {
    return res
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

export const getAll: RequestHandler = async (req, res): Promise<Response> => {
  try {

  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
export const getOne: RequestHandler = async (req, res): Promise<Response> => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

export const deleteTask: RequestHandler = async (req, res): Promise<Response> => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
export const update: RequestHandler = async (req, res): Promise<Response> => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

