# private-truffle

How to deploy contracts on a private blockchain using truffle.

## pre-reqs

These instructions assume you have successfully completed the [hello-world](../hello-world) and [private-blockchain](../private-blockchain) tutorials. It doesn't matter if you are connected to other nodes. It assumes that the primary account (the first one) exists and has ether.

## unlock primary account

The primary account is just the first account in geth. Truffle uses this by default unless a specific account is listed in its config.

If geth is not running cd in to its folder

```bash
$ cd ~/path/to/private-blockchain
```

Start it up with a console and enable rpc (this is how truffle communicates with it)

```bash
$ geth --datadir privatenetwork --networkid 100 --rpc console
```

## unlock the primary account

```bash
$ personal.unlockAccount(eth.accounts[0])
```

## update truffle config

Fire up a new terminal window and cd in to hello-world/code folder

```bash
$ cd ~/path/to/hello-world/code
```

Update the truffle config (note the 'gas' property). 
***Clarification needed***
I think this needs to be enough to cover the cost of the gas for creating the contract but less that the gas limit defined in the genesis block (which for hello-world is 2100000). 
```bash
module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "100",
      gas: 2000000
    }
  }
};
```

## Start truffle dev environment

```bash
$ truffle develop
```

## Compile
```bash
truffle(develop)> compile
```

## Migrate (deploy)
```bash
truffle(develop)> migrate --network development
```
or

## Migrate (deploy) - verbose
This shows the actual rpc requests and responses between truffle and geth. There is a known issue with this which could cause the responses to repeat endlessly with some kind of 'filter update'. It can be useful to see any errors though.

```bash
truffle(develop)> migrate --network development --verbose-rpc
```

The hello-world contract should now be held in a transaction waiting to be mined in order to be fully deployed on the private blockchain. (I think. Is this correct???)
The transaction hash should be displayed. 




From this point on these notes are just poking around having a look at what is happening under the hood.
===



***Check this here - missed it when doing it***

(Should be 0xd705bcd20303020867053cee168c8a1b2ed1eb97e57b62ccf9483fbe6c4233b2 for this example).

## check the txpool (only applies if nothing is mining)

```bash
> txpool.status
```

There should be a pending transaction

```bash
{
  pending: 1,
  queued: 0
}
```

## inspect the txpool (only applies if nothing is mining)

```bash
> txpool.inspect
```

```bash
{
  pending: {
    0x24e02201A9c1a64B3FE9E0ce4a73E4fEc0d93f5A: {
      0: "contract creation: 0 wei + 2000000 gas × 100000000000 wei"
    }
  },
  queued: {}
}
```

## Mine the pending transaction in to a block
You only need to mine a couple of blocks. Try and take note of the block number from the console output.
```bash
> miner.start()
```

```bash
> miner.stop()
```

The block number output will look something like this (here it is 87): 

```bash
INFO [12-02|21:39:09] Successfully sealed new block            number=87 hash=0f9481…5d4b58
```

## check the block

```bash
eth.getBlock(87)
```

The transaction for the contract creation can be seen in the transactions array:

```bash
{
  difficulty: 131072,
  extraData: "0xd883010703846765746887676f312e392e328664617277696e",
  gasLimit: 2285983,
  gasUsed: 269607,
  hash: "0x0f9481f54489bfab331b016cde86cb2dcc63986149b915ef8858c6a8915d4b58",
  logsBloom: "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  miner: "0x24e02201a9c1a64b3fe9e0ce4a73e4fec0d93f5a",
  mixHash: "0x770a684f9592016f3f30478c9035cc7a5381cb8d586ec62675e74e5c10ba0604",
  nonce: "0x67af1756ca885d97",
  number: 87,
  parentHash: "0x90d2b9140e2fd6740d1389fa2ebee8abc5019ddbdc844f392b68d4729fd6c4cf",
  receiptsRoot: "0x133eb49cf6f403d3d9a0472ad7fd407672576aa5c7d392d03434677de022784c",
  sha3Uncles: "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
  size: 1453,
  stateRoot: "0xac977cf4b340a264a40fbdd276ad55dffb564b2f7eb9fde77d6e4833f111c2c0",
  timestamp: 1512250747,
  totalDifficulty: 11639246,
  transactions: ["0xd705bcd20303020867053cee168c8a1b2ed1eb97e57b62ccf9483fbe6c4233b2"],
  transactionsRoot: "0x8a514ff0171cf221b2e4b817db19ec1fc4880764e49471d07c8495387e99975b",
  uncles: []
}
```

## show the actual transaction

```bash
> eth.getTransaction("0xd705bcd20303020867053cee168c8a1b2ed1eb97e57b62ccf9483fbe6c4233b2")
```

```bash
{
  blockHash: "0x0f9481f54489bfab331b016cde86cb2dcc63986149b915ef8858c6a8915d4b58",
  blockNumber: 87,
  from: "0x24e02201a9c1a64b3fe9e0ce4a73e4fec0d93f5a",
  gas: 2000000,
  gasPrice: 100000000000,
  hash: "0xd705bcd20303020867053cee168c8a1b2ed1eb97e57b62ccf9483fbe6c4233b2",
  input: "0x6060604052341561000f57600080fd5b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506102db8061005e6000396000f300606060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630900f01014610067578063445df0ac146100a05780638da5cb5b146100c9578063fdacd5761461011e575b600080fd5b341561007257600080fd5b61009e600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610141565b005b34156100ab57600080fd5b6100b3610224565b6040518082815260200191505060405180910390f35b34156100d457600080fd5b6100dc61022a565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561012957600080fd5b61013f600480803590602001909190505061024f565b005b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610220578190508073ffffffffffffffffffffffffffffffffffffffff1663fdacd5766001546040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050600060405180830381600087803b151561020b57600080fd5b6102c65a03f1151561021c57600080fd5b5050505b5050565b60015481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156102ac57806001819055505b505600a165627a7a72305820ee28cf181ca3d09298daf353c7fa3931d149e01e537bddd3b01dfd2cb1cc3db00029",
  nonce: 0,
  r: "0xabf35ae6235b7b31b491f6c727e7a58e7b7adbfa53c326b3e7e7f2edefffd001",
  s: "0x26c8f3c7e9029f86ca8a67669ead8af13650b1cd40f3007d47a2c56d2732b72c",
  to: null,
  transactionIndex: 0,
  v: "0xeb",
  value: 0
}
```

TODO

Figure out how to load the contract and call it from geth console.


