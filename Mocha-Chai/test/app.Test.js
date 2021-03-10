const { assert, expect } = require("chai");
const app = require("../app");

// Results
sayHelloResult = app.sayHello();
addNumbersResult = app.addNumbers(5, 5);

describe("App", function () {

  describe("sayHello()", function () {
    it("sayHello should return hello", function () {
      let result = sayHelloResult;
      //expect(result).to.be.eq('hello')
      assert.equal(result, "hello");
    });

    it("sayHello should return type string", function () {
      let result = sayHelloResult;
      assert.typeOf(result, "string");
    });
  });

  describe("addNumbers()", function () {
    it("addNumbers should be above 5", function () {
      let result = addNumbersResult;
      assert.isAbove(result, 5);
    });

    it("addNumbers should return type number", function () {
      let result = addNumbersResult;
      assert.typeOf(result, "number");
    });
  });
  
});
