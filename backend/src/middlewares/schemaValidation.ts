import { Request, Response, NextFunction } from 'express';
import { Schema, ErrorReport } from 'joi';

export const schemaValidation = (schema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // schema options
      const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true, // remove unknown props
      };
      await schema.validateAsync(req.body, options);
      next();
    } catch (err: any) {
      let message = err.message
        .map((x: { message: string }) => x.message.replace(/['"]/g, ''))
        .join(', ');
      res.status(422).json({ message });
    }
  };
};
