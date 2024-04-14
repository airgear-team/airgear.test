import { faker } from '@faker-js/faker';

export class FakerDataGenerator {

  // Generate a password with the specified length
  async getPassword(length: number): Promise<string> {
    return faker.internet.password({length});
  }

  // Generates a random email address
  async generateEmail(): Promise<string> {
    return faker.internet.email();
  }

  // TODO: temporary method needs to be redone
  // Generates a random phone number within the specified length range
  async getPhoneNumber(): Promise<string> {
    const phoneNumber = '+380' + Math.floor(100000000 + Math.random() * 900000000).toString().substring(0, 9);
    return phoneNumber;
  }

  // Generates a fake full name (last name + first name)
  async getFullName(): Promise<string> {
    return faker.person.fullName();
  }

}
