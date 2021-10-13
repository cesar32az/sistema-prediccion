declare namespace Express {
    export interface Request {
      user: {
        username: string;
        email: string;
        password: string;
        roles: Array<string>;
        _id: string;
        name: string;
      };
    }
  }
  