pragma solidity ^0.4.17;

contract HelloWorld {
  address public owner;
  mapping(address => string) public messages;

  function HelloWorld() public {
    owner = msg.sender;
  }

  function setMessage(string message) public {
    messages[msg.sender] = message;
  }

  function getValue() public view returns (string) {
    return messages[msg.sender];
  }
}
