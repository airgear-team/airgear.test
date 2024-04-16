import { test, expect } from "@playwright/test";
import Joi  from "joi";
import { FakerDataGenerator } from '../../../../main/generator/fakerDataGenerator';

test("Get auth token, post /auth/authenticate", async ({request}) => {

  const dataGenerator = new FakerDataGenerator();

  const testNewUserData = {
    password: await dataGenerator.getPassword(12),
    email: await dataGenerator.generateEmail(),
    phone: await dataGenerator.getPhoneNumber(),
    name: await dataGenerator.getFullName(),
  };

  const postCreateUserResponse = await request.post('/auth/register', {
    data: testNewUserData,
  });
  
  console.log(await postCreateUserResponse.json());

  expect(postCreateUserResponse.status()).toBe(201);

  const postGetAuthTokenResponse = await request.post('/auth/authenticate', {
    data: {
      email: testNewUserData.email,
      password: testNewUserData.password,
    }
  })

  expect(postGetAuthTokenResponse.status()).toBe(200);

  const responseData = await postGetAuthTokenResponse.json();
  
  expect(responseData).toHaveProperty("token");
});

test("Validate json schema, post /auth/authenticate", async ({request}) => {

  const response = {
    "token":"svfdfvdfvdfvsvdf"
  }

  const schema = Joi.object({
    token: Joi.string().required()
  });

  const dataGenerator = new FakerDataGenerator();

  const testNewUserData = {
    password: await dataGenerator.getPassword(12),
    email: await dataGenerator.generateEmail(),
    phone: await dataGenerator.getPhoneNumber(),
    name: await dataGenerator.getFullName(),
  };

  const postCreateUserResponse = await request.post('/auth/register', {
    data: testNewUserData,
  });
  
  console.log(await postCreateUserResponse.json());

  expect(postCreateUserResponse.status()).toBe(201);

  const postGetAuthTokenResponse = await request.post('/auth/authenticate', {
    data: {
      email: testNewUserData.email,
      password: testNewUserData.password
    }
  })

  expect(postGetAuthTokenResponse.status()).toBe(200);

  Joi.assert(await postGetAuthTokenResponse.json(), schema);

});