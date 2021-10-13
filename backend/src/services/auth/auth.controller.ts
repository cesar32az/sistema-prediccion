import { RequestHandler, Response } from 'express';
import User, { IUser } from './user/User.model';
import Role, { IRoles } from './role/Role.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../../config/dotenv';

export const signup: RequestHandler = async (req, res): Promise<Response> => {
  try {
    const { roles, password } = req.body;
    const newUser: IUser = new User(req.body);
    newUser.password = await bcrypt.hash(password, 10);

    if (roles) {
      //buscando roles
      const foundRoles: IRoles[] = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role: IRoles) => role._id);
    } else {
      //guardando rol user por defecto
      const role: IRoles[] = await Role.find({ name: 'user' });
      newUser.roles = role.map((rol: IRoles) => rol._id);
    }
    const userSaved: IUser = await newUser.save();
    const token: string = createToken(userSaved);

    return res.status(201).json({ token, user: userSaved });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

export const signin: RequestHandler = async (req, res): Promise<Response> => {
  try {
    const { email, password } = req.body;

    let user: IUser | null = await User.findOne({ email }).select('+password').populate('roles');

    if (!user) return res.status(400).json({ message: 'User not found' });
    // comparacion del password
    const match: boolean = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid password' });
    // crear token
    const token: string = createToken(user);
    return res.json({ token, user });
  } catch (error) {
    console.error({ error });
    return res.status(400).json({ error: 'hi' });
  }
};
const createToken = (user: IUser): string => {
  return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
    expiresIn: 86400, // 24 hrs
  });
};
