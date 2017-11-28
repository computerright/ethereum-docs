var HelloWorld = artifacts.require("HelloWorld");

function runTestWithAccount(accountAddress, message) {
  it("should allow us to set a message", function() {
    var testInstance;
    return HelloWorld.deployed().then(function(instance) {
      testInstance = instance;
      return instance.setMessage(message, {from:accountAddress});
    }).then(function() {
      return testInstance.getValue.call({from:accountAddress})
    }).then(function(val) {
      assert.equal(val, message, 'value was not what we set')
    })
  });
}

contract('HelloWorld', function(accounts) {
  runTestWithAccount(accounts[0], 'FIRST WALLET')
  runTestWithAccount(accounts[1], 'SECOND WALLET')

  it("should not allow us to see other addresses messages", function() {

    var testInstance;
    var message = 'SAUSAGES FOR TEA'
    return HelloWorld.deployed().then(function(instance) {
      testInstance = instance;
      return instance.setMessage(message, {from:accounts[3]});
    }).then(function() {
      return testInstance.getValue.call({from:accounts[4]})
    }).then(function(val) {
      assert.notEqual(val, message, 'value was equal and should not have been')
    })
    
  });
});