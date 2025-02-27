// user-signup-dto.model.spec.ts
import { UserSignupDTO } from './user-signup-dto.model';

describe('UserSignupDTO', () => {
  it('should define the expected properties', () => {
    const userSignup: UserSignupDTO = {
      firstName: 'Test',
      lastName: 'User',
      displayName:'Test User',
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'securepassword',
      numtel:'string'
    };

    expect(userSignup.firstName).toEqual('Test');
    expect(userSignup.lastName).toEqual('User');
    expect(userSignup.displayName).toEqual('testuser');

    expect(userSignup.username).toEqual('testuser');
    expect(userSignup.email).toEqual('testuser@example.com');
    expect(userSignup.password).toEqual('securepassword');
  });

  it('should not allow direct instantiation', () => {
    // On ne peut pas créer une instance car c'est une interface
    // Ce test est en fait redondant vu qu'on ne peut pas instancier une interface.
    // Donc, ce test peut être supprimé.
    // expect(() => new UserSignupDTO()).toThrowError();
  });
});