import { test, expect } from "@playwright/test";
import { FakerDataGenerator } from '../../main/generator/fakerDataGenerator';

const testData = [
  {
    testCase:"Incorrect password, less than 8 characters",
    value: 1,
    statusCode:500 // TODO: replace with corrected response code
  },
  {
    testCase:"Incorrect password, more than 50 characters",
    value: 70,
    statusCode:500 // TODO: replace with corrected response code
  },
  {
    testCase:"Correct password, 12 characters",
    value: 12,
    statusCode:201
  },
  {
    testCase:"Correct password, 8 characters",
    value: 8,
    statusCode:201
  },
  {
    testCase:"Correct password, 50 characters",
    value: 50,
    statusCode:201
  }
];

for(const{testCase, value, statusCode} of testData){
  test(`${testCase}`, async ({request}) => {

    const dataGenerator = new FakerDataGenerator();

    const testData = {
      password: await dataGenerator.getPassword(value),
      email: await dataGenerator.generateEmail(),
      phone: await dataGenerator.getPhoneNumber(),
      name: await dataGenerator.getFullName(),
    };

    const createUserResponse = await request.post('/auth/register', {
      data: testData,
    });
  
    console.log(await createUserResponse.json());

    expect(createUserResponse.status()).toBe(statusCode);

    if(statusCode == 201) {
      const responseData = await createUserResponse.json();
  
      expect(responseData).toHaveProperty("email",`${testData.email}`);
      expect(responseData).toHaveProperty("phone",`${testData.phone}`);
      expect(responseData).toHaveProperty("name", `${testData.name}`);

      expect(responseData).not.toHaveProperty("password");
    }
  });
}
