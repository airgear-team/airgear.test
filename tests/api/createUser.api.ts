import { FakerDataGenerator } from './../../main/generator/fakerDataGenerator';
import { test, expect } from "@playwright/test";

test("Create user", async ({request}) => {

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