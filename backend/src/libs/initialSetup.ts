import Role, { IRoles } from '../services/auth/role/Role.model';

export const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count > 0) return;

    const values: Array<IRoles> = await Promise.all([
      new Role({ name: 'user' }).save(),
      new Role({ name: 'admin' }).save(),
      new Role({ name: 'creator' }).save(),
    ]);
    console.log(values);
  } catch (e) {
    console.error(e);
  }
};
createRoles();
