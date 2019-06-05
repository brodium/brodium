// future unit tests here
const functions = require('../Components/Landing/LoginForm')


test("handleInputChange1() should return input in the email box", () => {
  expect(functions.handleInputChange1('dev@dev.com')).toEqual('dev@dev.com');
});