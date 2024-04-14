import { FakerDataGenerator } from '../../../../main/generator/fakerDataGenerator';
import { test, expect } from "@playwright/test";
import Joi  from "joi";

test("Create user, post /auth/register", async ({request}) => {

  const dataGenerator = new FakerDataGenerator();

  const testData = {
    password: await dataGenerator.getPassword(12),
    email: await dataGenerator.generateEmail(),
    phone: await dataGenerator.getPhoneNumber(),
    name: await dataGenerator.getFullName(),
  };

  const createUserResponse = await request.post('/auth/register', {
    data: testData,
  });
  
  console.log(await createUserResponse.json());

  expect(createUserResponse.status()).toBe(201);

  const responseData = await createUserResponse.json();
  
  expect(responseData).toHaveProperty("email",`${testData.email}`);
  expect(responseData).toHaveProperty("phone",`${testData.phone}`);
  expect(responseData).toHaveProperty("name", `${testData.name}`);

  expect(responseData).not.toHaveProperty("password");

});

test("Validate json schema, post /auth/register", async ({request}) => {

  const response = {
    "id": 30,
    "email": "gri2148756iie@example.com",
    "phone": "+380551886564",
    "name": "Griiiin Doe",
    "roles": [
        "USER"
    ],
    "goods": null,
    "createdAt": "2024-04-14T22:05:53.6078556+03:00",
    "deleteAt": null,
    "status": "ACTIVE",
    "userReviews": null
  }

  const schema = Joi.object({
    id: Joi.number().integer().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    name: Joi.string().required(),
    roles: Joi.array().items(Joi.string()).required(),
    goods: Joi.array().items(Joi.any()).allow(null).required(),
    createdAt: Joi.string().isoDate().required(),
    deleteAt: Joi.string().isoDate().allow(null),
    status: Joi.string().valid('ACTIVE', 'INACTIVE', 'SUSPENDED').required(),
    userReviews: Joi.array().items(Joi.any()).allow(null)
  });

  const dataGenerator = new FakerDataGenerator();

  const testData = {
    password: await dataGenerator.getPassword(12),
    email: await dataGenerator.generateEmail(),
    phone: await dataGenerator.getPhoneNumber(),
    name: await dataGenerator.getFullName(),
  };

  const createUserResponse = await request.post('/auth/register', {
    data: testData,
  });

  Joi.assert(await createUserResponse.json(), schema);

});