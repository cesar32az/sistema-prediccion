import { RequestHandler, Response } from 'express';
import User, { IUser } from './User.model';

export const getProfile: RequestHandler = async (req, res): Promise<Response> => {
  try {
    let user = req.user;
    return res.json({ user });
  } catch (error) {
    return res.json({ error });
  }
};

export const updateProfile: RequestHandler = async (req, res): Promise<Response> => {
  try {
    const id = req.user._id;
    const userUpdated: IUser | null = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!userUpdated) return res.status(400).json({ message: 'User not found' });
    return res.json({
      message: 'User updated succesfully',
      userUpdated,
    });
  } catch (error) {
    return res.json(error);
  }
};
