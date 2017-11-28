pragma solidity ^0.4.17;

contract Test {
  address public owner;
  uint public value = 2;

  function Test() public {
    owner = msg.sender;
  }

  function setValue(uint val) public {
    value = val;
  }

  function getValue() public view returns (uint) {
    return value;
  }
}
