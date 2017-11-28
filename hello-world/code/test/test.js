// Specifically request an abstraction for MetaCoin
var Test = artifacts.require("Test");

contract('Test', function(accounts) {
  it("should allow us to set a value", function() {
    var testInstance;
    return Test.deployed().then(function(instance) {
      testInstance = instance;
      return instance.setValue(3);
    }).then(function() {
      return testInstance.getValue.call()
    }).then(function(val) {
      assert.equal(val, 3, 'value was not what we set')
    })
  });
});