import { Request, Response, NextFunction, RequestHandler } from 'express';
import Role from '../services/auth/role/Role.model';

export const isCreator: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user;
  const roles = await Role.find({ _id: { $in: user.roles } });

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === 'creator') {
      next();
      return;
    }
  }
  return res.status(403).json({ message: 'Require creator rol' });
};

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  const roles = await Role.find({ _id: { $in: user.roles } });

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === 'admin') {
      next();
      return;
    }
  }
  return res.status(403).json({ message: 'Require admin rol' });
};
