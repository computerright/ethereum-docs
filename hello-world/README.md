# hello-world-right

A simple way to get truffle and testrpc installed.

## install

First install [node.js](https://nodejs.org/en/download/)

Then - install truffle:

```bash
$ npm install -g truffle
```

Change into the `code` folder.

```bash
$ cd code
```

Then - to get a truffle environment - type this.

```bash
$ truffle develop
```

Then - make changes to the contracts inside of `code/contracts` and compile the contracts:

```bash
truffle(develop)> compile
```

Also - be sure to have created a migration for your contracts (inside `code/migrations`)

Then to deploy the compiled contracts:

```bash
truffle(develop)> migrate
```

Finally - run the tests:

```bash
truffle(develop)> test
```


#### Task 1

The contract should save a string (as `bytes32`), associated with the address that send the transaction.
This should then be readable, from the address which sent the string in the first place.

