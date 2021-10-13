import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../services/auth/user/User.model';
import { ROLES } from '../services/auth/role/Role.model';

export const checkDuplicates = async (req: Request, res: Response, next: NextFunction) => {
  const user: IUser | null = await User.findOne({ username: req.body.username });
  if (user) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const email = await User.findOne({ email: req.body.email });
  if (email) {
    return res.status(400).json({ message: 'Email already exists' });
  }
  next();
};
export const checkRolesExisted = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`,
        });
        return;
      }
    }
  }
  next();
};
