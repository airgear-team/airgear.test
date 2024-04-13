import { test, expect } from "@playwright/test";

test("Create user", async ({request}) => {

  const testData = {
    password: "secretpassword2",
    email: "g178335q1@example.com", // унікальне поле
    phone: "+380978816967", // унікальне поле
    name: "Griiiin Doe"
  };

  const createUserResponse = await request.post('/auth/register', {
    data: testData,
  });

  expect(createUserResponse.status()).toBe(201);

});