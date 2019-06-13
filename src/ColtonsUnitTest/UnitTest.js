// future unit tests here
const functions = require('../components/Landing/LoginForm')


test("handleInputChange1() should return input in the email box", () => {
  expect(functions.handleInputChange1('dev@dev.com')).toEqual('dev@dev.com');
});




// make a end end point with database that will get all the copmany ids and will return a list of the the company (their ids)