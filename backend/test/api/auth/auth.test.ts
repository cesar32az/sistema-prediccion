import supertest from 'supertest';
import app from '../../../src/app';

let request: supertest.SuperTest<supertest.Test>;
const baseUri = '/api/tasks';
beforeAll(() => {
  app;
  request = supertest(app);
});

// list
it('should get list resources', async () => {
  const response = await request.get(baseUri);
  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('tasks');
});
